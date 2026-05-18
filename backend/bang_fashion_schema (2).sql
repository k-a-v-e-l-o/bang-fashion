-- ============================================================
--  BANG FASHION  |  PostgreSQL Schema
--  Aligned with main.js, admin.js, and test-data.js
--  No DEFAULT values — all values supplied explicitly by app.
-- ============================================================


-- ============================================================
--  ENUMS
-- ============================================================

CREATE TYPE order_status AS ENUM (
    'pending',
    'processing',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled'
);

-- Product categories derived from main.js product list
CREATE TYPE product_category AS ENUM (
    'tshirt',
    'sweater',
    'hoodie',
    'dress',
    'set'
);


-- ============================================================
--  1. CATEGORIES
--     Mirrors the category filter values in main.js
-- ============================================================
CREATE TABLE categories (
    id      SERIAL          PRIMARY KEY,
    slug    VARCHAR(50)     NOT NULL UNIQUE,   -- matches main.js: 'tshirt','hoodie','dress','set','sweater'
    name    VARCHAR(100)    NOT NULL UNIQUE    -- display name: 'T-Shirts', 'Hoodies', etc.
);


-- ============================================================
--  2. USERS
--     Covers both registered customers (main.js auth flow)
--     and guest checkouts (no password required).
-- ============================================================
CREATE TABLE users (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(150)    NOT NULL,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    phone           VARCHAR(30),                        -- captured in checkout form
    password_hash   TEXT,                               -- NULL for guest checkouts
    is_guest        BOOLEAN         NOT NULL,
    registered_at   TIMESTAMPTZ     NOT NULL            -- maps to registeredAt in localStorage
);


-- ============================================================
--  CONTACT MESSAGES
--  Required by submitContactForm() in the storefront.
--  Stores all customer enquiries submitted via the
--  contact form on the Bang Fashion website.
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id          SERIAL          PRIMARY KEY,
    name        VARCHAR(150)    NOT NULL,               -- customer full name
    email       VARCHAR(255)    NOT NULL,               -- customer email address
    subject     VARCHAR(255),                           -- e.g. 'Order enquiry, sizing, etc.'
    message     TEXT            NOT NULL,               -- message body
    is_read     BOOLEAN         NOT NULL DEFAULT FALSE, -- admin read/unread toggle
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()  -- timestamp of submission
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read    ON contact_messages(is_read);


--K@velo_M@shoene

-- ============================================================
--  3. ADDRESSES
--     Structured split of the flat shippingAddress string
--     from main.js: "${address}, ${city}, ${province}"
-- ============================================================
CREATE TABLE addresses (
    id          SERIAL          PRIMARY KEY,
    user_id     INT             NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label       VARCHAR(50),                            -- 'Home', 'Work', etc. (optional)
    street      VARCHAR(255)    NOT NULL,
    city        VARCHAR(100)    NOT NULL,
    province    VARCHAR(100)    NOT NULL,               -- frontend uses 'province', not 'state'
    postal_code VARCHAR(20),                            -- optional for guest flow
    country     VARCHAR(100)    NOT NULL
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);


-- ============================================================
--  4. PRODUCTS
--     Directly mirrors the products array in main.js.
--     Includes folder + image for frontend image rendering.
-- ============================================================
CREATE TABLE products (
    id              SERIAL              PRIMARY KEY,
    category_id     INT                 NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name            VARCHAR(255)        NOT NULL,
    description     TEXT,
    price           NUMERIC(10, 2)      NOT NULL CHECK (price >= 0),
    stock_quantity  INT                 NOT NULL CHECK (stock_quantity >= 0),
    folder          VARCHAR(100)        NOT NULL,       -- e.g. 'bang_bb_t_shirt' — used for image path
    main_image      VARCHAR(255)        NOT NULL,       -- filename of the hero/thumbnail image
    created_at      TIMESTAMPTZ         NOT NULL
);

CREATE INDEX idx_products_category_id ON products(category_id);


-- ============================================================
--  5. PRODUCT_IMAGES
--     One row per image file in productsData[folder].images
--     Enables the lightbox gallery in main.js
-- ============================================================
CREATE TABLE product_images (
    id          SERIAL          PRIMARY KEY,
    product_id  INT             NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    filename    VARCHAR(255)    NOT NULL,
    sort_order  INT             NOT NULL    -- controls display order in lightbox
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);


-- ============================================================
--  6. PRODUCT_VARIANTS
--     Captures the sizes[] and colors[] arrays per product
--     in main.js. Each row = one valid size/color combination.
-- ============================================================
CREATE TABLE product_variants (
    id          SERIAL          PRIMARY KEY,
    product_id  INT             NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size        VARCHAR(10)     NOT NULL,   -- 'S','M','L','XL','XXL'
    color       VARCHAR(50)     NOT NULL    -- 'Black','White','Brown', etc.
);

CREATE UNIQUE INDEX idx_product_variants_unique
    ON product_variants(product_id, size, color);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);


-- ============================================================
--  7. ORDERS
--     Maps to the order object saved in localStorage and
--     constructed in saveOrderToLocalStorage() in main.js.
--     display_id = "ORD-001" format shown in admin panel.
-- ============================================================
CREATE TABLE orders (
    id                      SERIAL          PRIMARY KEY,
    display_id              VARCHAR(20)     NOT NULL UNIQUE,    -- 'ORD-001', 'ORD-002'
    user_id                 INT             NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    shipping_address_id     INT             REFERENCES addresses(id) ON DELETE SET NULL,
    total_amount            NUMERIC(12, 2)  NOT NULL CHECK (total_amount >= 0),
    status                  order_status    NOT NULL,
    created_at              TIMESTAMPTZ     NOT NULL,           -- maps to order.date in JS
    updated_at              TIMESTAMPTZ     NOT NULL            -- maps to order.updatedAt in JS
);

CREATE INDEX idx_orders_user_id             ON orders(user_id);
CREATE INDEX idx_orders_shipping_address_id ON orders(shipping_address_id);
CREATE INDEX idx_orders_status              ON orders(status);
CREATE INDEX idx_orders_display_id          ON orders(display_id);


-- ============================================================
--  8. ORDER_ITEMS
--     Bridge table: one row per line item in cart[].
--     Stores variant snapshot so size/color are preserved
--     even if the variant is later removed.
--     price_at_purchase freezes the price at order time.
-- ============================================================
CREATE TABLE order_items (
    id                      SERIAL          PRIMARY KEY,
    order_id                INT             NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id              INT             NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name            VARCHAR(255)    NOT NULL,           -- snapshot: name at order time
    size                    VARCHAR(10)     NOT NULL,           -- from cart item: item.size
    color                   VARCHAR(50)     NOT NULL,           -- from cart item: item.color
    quantity                INT             NOT NULL CHECK (quantity > 0),
    price_at_purchase       NUMERIC(10, 2)  NOT NULL CHECK (price_at_purchase >= 0)
);

CREATE INDEX idx_order_items_order_id   ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

ALTER TABLE order_items
    ADD CONSTRAINT uq_order_items_line UNIQUE (order_id, product_id, size, color);


-- ============================================================
--  9. ACTIVITY_LOG
--     Replaces bangFashionActivities in localStorage.
--     Written by admin panel on every status change,
--     and by checkout on every new order.
-- ============================================================
CREATE TABLE activity_log (
    id          SERIAL          PRIMARY KEY,
    message     TEXT            NOT NULL,
    created_at  TIMESTAMPTZ     NOT NULL
);

CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);


-- ============================================================
--  SEED DATA
--  Mirrors the products array in main.js exactly.
-- ============================================================

-- Categories
INSERT INTO categories (slug, name) VALUES
    ('tshirt',  'T-Shirts'),
    ('sweater',  'Sweaters'),
    ('hoodie',   'Hoodies'),
    ('dress',    'Dresses'),
    ('set',      'Sets');

-- Products (id 1–12 mirrors main.js product ids)
INSERT INTO products (id, category_id, name, description, price, stock_quantity, folder, main_image, created_at) VALUES
    (1,  4, 'Bang BB Dress',        NULL, 500.00,  0, 'bang_bb_dress',        'WhatsApp Image 2026-05-04 at 12.44.35.jpeg',      '2026-05-04 12:00:00+02'),
    (2,  2, 'Bang BB Sweater',      NULL, 650.00,  0, 'bang_bb_sweater',      'WhatsApp Image 2026-05-04 at 12.43.44 (3).jpeg',  '2026-05-04 12:00:00+02'),
    (3,  1, 'Bang BB T-shirt',      NULL, 400.00,  0, 'bang_bb_t_shirt',      'WhatsApp Image 2026-05-04 at 12.43.37.jpeg',      '2026-05-04 12:00:00+02'),
    (4,  1, 'Bang-Care',            NULL, 500.00,  0, 'bang_care',            'WhatsApp Image 2026-05-04 at 12.43.40 (1).jpeg',  '2026-05-04 12:00:00+02'),
    (5,  5, 'Bang Danger 2pc Set',  NULL, 1000.00, 0, 'bang_danger_2pc_set',  'WhatsApp Image 2026-05-04 at 12.43.47 (2).jpeg',  '2026-05-04 12:00:00+02'),
    (6,  1, 'Bang Danger T-shirt',  NULL, 500.00,  0, 'bang_danger_t_shirt',  'WhatsApp Image 2026-05-04 at 12.44.34 (1).jpeg',  '2026-05-04 12:00:00+02'),
    (7,  1, 'Bang Essence',         NULL, 500.00,  0, 'bang_essence',         'WhatsApp Image 2026-05-04 at 12.43.43 (2).jpeg',  '2026-05-04 12:00:00+02'),
    (8,  1, 'Bang Is Valuable',     NULL, 450.00,  0, 'bang_is_valuable',     'WhatsApp Image 2026-05-04 at 12.43.35 (1).jpeg',  '2026-05-04 12:00:00+02'),
    (9,  1, 'Bang Is Valuable 2.0', NULL, 500.00,  0, 'bang_is_valuable_2',   'WhatsApp Image 2026-05-04 at 12.44.32 (1).jpeg',  '2026-05-04 12:00:00+02'),
    (10, 5, 'Bang Root 2pc Set',    NULL, 1000.00, 0, 'bang_root_2pc',        'WhatsApp Image 2026-05-04 at 12.44.24.jpeg',      '2026-05-04 12:00:00+02'),
    (11, 3, 'Bang Root Hoodie',     NULL, 700.00,  0, 'bang_root_hoodie',     'WhatsApp Image 2026-05-04 at 12.44.23 (1).jpeg',  '2026-05-04 12:00:00+02'),
    (12, 1, 'Bang Root T-shirt',    NULL, 500.00,  0, 'bang_root_t_shirt',    'WhatsApp Image 2026-05-04 at 12.44.30 (1).jpeg',  '2026-05-04 12:00:00+02');

-- Reset sequence after manual id inserts
SELECT setval('products_id_seq', 12);

-- Product variants (sizes and colors from main.js)
INSERT INTO product_variants (product_id, size, color) VALUES
    -- Bang BB Dress (id 1): Black, White, Beige, Orange
    (1,'S','Black'),(1,'M','Black'),(1,'L','Black'),(1,'XL','Black'),(1,'XXL','Black'),
    (1,'S','White'),(1,'M','White'),(1,'L','White'),(1,'XL','White'),(1,'XXL','White'),
    (1,'S','Beige'),(1,'M','Beige'),(1,'L','Beige'),(1,'XL','Beige'),(1,'XXL','Beige'),
    (1,'S','Orange'),(1,'M','Orange'),(1,'L','Orange'),(1,'XL','Orange'),(1,'XXL','Orange'),
    -- Bang BB T-shirt (id 3): Black, White, Brown, Green
    (3,'S','Black'),(3,'M','Black'),(3,'L','Black'),(3,'XL','Black'),(3,'XXL','Black'),
    (3,'S','White'),(3,'M','White'),(3,'L','White'),(3,'XL','White'),(3,'XXL','White'),
    (3,'S','Brown'),(3,'M','Brown'),(3,'L','Brown'),(3,'XL','Brown'),(3,'XXL','Brown'),
    (3,'S','Green'),(3,'M','Green'),(3,'L','Green'),(3,'XL','Green'),(3,'XXL','Green'),
    -- Bang Root Hoodie (id 11): Black, White, Grey, Green, Brown, Blue
    (11,'S','Black'),(11,'M','Black'),(11,'L','Black'),(11,'XL','Black'),(11,'XXL','Black'),
    (11,'S','White'),(11,'M','White'),(11,'L','White'),(11,'XL','White'),(11,'XXL','White'),
    (11,'S','Grey'),(11,'M','Grey'),(11,'L','Grey'),(11,'XL','Grey'),(11,'XXL','Grey'),
    (11,'S','Green'),(11,'M','Green'),(11,'L','Green'),(11,'XL','Green'),(11,'XXL','Green'),
    (11,'S','Brown'),(11,'M','Brown'),(11,'L','Brown'),(11,'XL','Brown'),(11,'XXL','Brown'),
    (11,'S','Blue'),(11,'M','Blue'),(11,'L','Blue'),(11,'XL','Blue'),(11,'XXL','Blue');
-- (Remaining products follow the same pattern — omitted for brevity)


-- ============================================================
--  USEFUL QUERIES
-- ============================================================

-- 1. Full order receipt (matches admin.js viewOrder())
-- SELECT
--     o.display_id,
--     u.name            AS customer,
--     u.email,
--     u.phone,
--     a.street || ', ' || a.city || ', ' || a.province  AS ship_to,
--     oi.product_name,
--     oi.size,
--     oi.color,
--     oi.quantity,
--     oi.price_at_purchase,
--     (oi.quantity * oi.price_at_purchase)              AS line_total,
--     o.total_amount,
--     o.status,
--     o.created_at
-- FROM orders o
-- JOIN users        u  ON u.id = o.user_id
-- JOIN addresses    a  ON a.id = o.shipping_address_id
-- JOIN order_items  oi ON oi.order_id = o.id
-- WHERE o.display_id = 'ORD-001';

-- 2. Dashboard stats (matches loadAndDisplayOrders() in admin.js)
-- SELECT
--     COUNT(*)                                            AS total_orders,
--     COUNT(*) FILTER (WHERE status = 'pending')          AS pending,
--     COUNT(*) FILTER (WHERE status = 'processing')       AS processing,
--     COUNT(*) FILTER (WHERE status = 'shipped')          AS shipped,
--     COUNT(*) FILTER (WHERE status = 'delivered')        AS delivered,
--     SUM(total_amount)                                   AS total_revenue
-- FROM orders;

-- 3. Recent activity log (matches loadAnalytics() in admin.js)
-- SELECT message, created_at
-- FROM activity_log
-- ORDER BY created_at DESC
-- LIMIT 20;

-- 4. Product gallery images for lightbox (matches openLightbox() in main.js)
-- SELECT filename, sort_order
-- FROM product_images
-- WHERE product_id = 3
-- ORDER BY sort_order;
