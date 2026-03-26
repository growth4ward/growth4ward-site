CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT,
  service_area TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
