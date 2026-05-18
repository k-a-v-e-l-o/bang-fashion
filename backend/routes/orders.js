const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// POST /api/orders — public, called when customer places order
router.post('/', async (req, res) => {
  const { customer_name, customer_email, customer_phone, shipping_address, items, total_amount } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const countResult = await client.query('SELECT COUNT(*) FROM orders');
    const count = parseInt(countResult.rows[0].count) + 1;
    const display_id = `ORD-${String(count).padStart(3, '0')}`;

    const orderResult = await client.query(`
      INSERT INTO orders (display_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW(), NOW())
      RETURNING id, display_id
    `, [display_id, customer_name, customer_email, customer_phone, shipping_address, total_amount]);

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, product_name, product_image_url, size, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [orderId, item.product_id || null, item.name, item.img || null, item.size, item.qty, item.price]);
    }

    await client.query(`
      INSERT INTO activity_log (message, created_at)
      VALUES ($1, NOW())
    `, [`New order ${display_id} placed by ${customer_name} — R ${total_amount}`]);

    await client.query('COMMIT');
    res.status(201).json({ message: 'Order placed successfully', display_id });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// GET /api/orders — admin only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await pool.query(`
      SELECT 
        o.id, o.display_id, o.customer_name, o.customer_email,
        o.customer_phone, o.shipping_address, o.total_amount,
        o.status, o.created_at,
        JSON_AGG(JSON_BUILD_OBJECT(
          'product_name', oi.product_name,
          'size', oi.size,
          'quantity', oi.quantity,
          'price', oi.price_at_purchase,
          'image', oi.product_image_url
        )) AS items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    res.json(orders.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/stats — admin only
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT
        COUNT(*) AS total_orders,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending,
        COUNT(*) FILTER (WHERE status = 'processing') AS processing,
        COUNT(*) FILTER (WHERE status = 'shipped') AS shipped,
        COUNT(*) FILTER (WHERE status = 'delivered') AS delivered,
        COALESCE(SUM(total_amount), 0) AS total_revenue
      FROM orders
    `);
    res.json(stats.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/orders/:id/status — admin only
router.patch('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query(`
      UPDATE orders SET status = $1, updated_at = NOW()
      WHERE id = $2 RETURNING display_id, customer_name
    `, [status, req.params.id]);

    const order = result.rows[0];
    await pool.query(`
      INSERT INTO activity_log (message, created_at)
      VALUES ($1, NOW())
    `, [`Order ${order.display_id} status updated to ${status}`]);

    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;