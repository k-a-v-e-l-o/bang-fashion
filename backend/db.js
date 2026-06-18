const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'aws-0-eu-west-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.kscakfhgoecqzgsqhvxs',
  password: process.env.DB_PASSWORD,
  ssl: false
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('🟢 Connected to Supabase successfully ✅');
  }
});

module.exports = pool;