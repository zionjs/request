// Jalankan: npm init -y && npm install express fs
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const FILE = "./request.json";

app.use(express.json());
app.use(express.static(__dirname));

if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");

app.get("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.post("/add", (req, res) => {
  const { request } = req.body;
  const data = JSON.parse(fs.readFileSync(FILE));
  data.push(request);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`✅ Server jalan di http://localhost:${PORT}`));