// Jalankan: npm init -y && npm install express fs && node server.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // serve index.html & request.json

const filePath = path.join(__dirname, "request.json");

// Pastikan file ada
if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");

// Endpoint untuk simpan request baru
app.post("/save-request", (req, res) => {
  const { request } = req.body;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.push(request);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ success: true, message: "Request disimpan!" });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});