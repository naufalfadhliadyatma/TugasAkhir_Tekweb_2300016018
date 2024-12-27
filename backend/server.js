const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('./database');
const cors = require('cors'); // Added CORS import

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});

app.use(cors()); // Added CORS middleware
app.use(bodyParser.json());

const compressImage = (req, res, next) => {
  if (!req.file) return next();

  const compressedFilePath = `uploads/compressed-${Date.now()}.jpg`;

  sharp(req.file.buffer)
    .resize({ width: 800 })
    .jpeg({ quality: 80 })
    .toFile(compressedFilePath, (err, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      req.file.path = compressedFilePath;
      next();
    });
};

// Create a new item
app.post('/items', upload.single('foto_barang'), compressImage, (req, res) => {
  const { judul, harga_barang, deskripsi } = req.body;
  const foto_barang = req.file.path;

  const query = `INSERT INTO items (judul, harga_barang, deskripsi, foto_barang) VALUES (?, ?, ?, ?)`;
  const data = [judul, harga_barang, deskripsi, foto_barang];
  db.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, data: data });
  });
});

// Read all items
app.get('/items', (req, res) => {
  const query = `SELECT * FROM items`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Read a single item by ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM items WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Update an item by ID
app.put('/items/:id', upload.single('foto_barang'), compressImage, (req, res) => {
  const { id } = req.params;
  const { judul, harga_barang, deskripsi } = req.body;
  const foto_barang = req.file ? req.file.path : null;
  const data = [judul, harga_barang, deskripsi, foto_barang];

  const query = `UPDATE items SET judul = ?, harga_barang = ?, deskripsi = ?, foto_barang = COALESCE(?, foto_barang) WHERE id = ?`;
  db.query(query, [judul, harga_barang, deskripsi, foto_barang, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: results.affectedRows, data: data });
  });
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM items WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: results.affectedRows });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
