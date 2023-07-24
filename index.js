const express = require("express");
const { connect } = require("./db/config");
const cors = require('cors');
const { Router } = require("./Routes/routes");
require("dotenv").config();

const app = express();

connect();

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId; // Simpan userId ke dalam req untuk digunakan di fungsi controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Tambahkan middleware verifyToken ke route yang ingin diproteksi
app.use('/protected', verifyToken, Router);

app.use(express.json());
app.use(cors());

app.use("/", Router);

app.listen(process.env.PORT, () => {
    console.log("Connected at", process.env.PORT);
});