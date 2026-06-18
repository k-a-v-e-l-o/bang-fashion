const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// GET /api/products — public, used by frontend
router.get('/', async (req, res) => {
  try {
    const products = await pool.query(`
      SELECT 
        p.id, p.name, p.description, p.price, p.badge, p.type,
        p.main_image, p.is_in_stock,
        c.name AS category,
        (SELECT ARRAY_AGG(pv.size ORDER BY pv.size) FROM product_variants pv WHERE pv.product_id = p.id) AS sizes,
        (SELECT ARRAY_AGG(pi.image_url ORDER BY pi.sort_order) FROM product_images pi WHERE pi.product_id = p.id) AS images
      FROM products p
      JOIN categories c ON c.id = p.category_id
      WHERE p.is_in_stock = true
      ORDER BY p.id
    `);
    res.json(products.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/all — admin only, includes inactive
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const products = await pool.query(`
      SELECT 
        p.id, p.name, p.description, p.price, p.badge, p.type,
        p.main_image, p.is_in_stock,
        c.name AS category,
        (SELECT ARRAY_AGG(pv.size ORDER BY pv.size) FROM product_variants pv WHERE pv.product_id = p.id) AS sizes,
        (SELECT ARRAY_AGG(pi.image_url ORDER BY pi.sort_order) FROM product_images pi WHERE pi.product_id = p.id) AS images
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ORDER BY p.id
    `);
    res.json(products.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products — admin only, add new product
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, badge, main_image, category_id, sizes, images } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const productResult = await client.query(`
      INSERT INTO products (category_id, name, description, price, badge, main_image, is_in_stock, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
      RETURNING id
    `, [category_id, name, description, price, badge, main_image]);

    const productId = productResult.rows[0].id;

    if (sizes && sizes.length > 0) {
      for (const size of sizes) {
        await client.query(
          'INSERT INTO product_variants (product_id, size, color) VALUES ($1, $2, $3)',
          [productId, size, 'Default']
        );
      }
    }

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await client.query(
          'INSERT INTO product_images (product_id, image_url, sort_order) VALUES ($1, $2, $3)',
          [productId, images[i], i]
        );
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Product added successfully', id: productId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// PATCH /api/products/:id/toggle — admin only, activate/deactivate
router.patch('/:id/toggle', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      'UPDATE products SET is_in_stock = NOT is_in_stock WHERE id = $1',
      [req.params.id]
    );
    res.json({ message: 'Product status toggled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;