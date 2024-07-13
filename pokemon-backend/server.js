const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

let renameCount = 0;
const fibonacci = (num) => {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

app.get("/catch", (req, res) => {
  const success = Math.random() < 0.5;
  res.json({ success });
});

app.get("/release", (req, res) => {
  const number = Math.floor(Math.random() * 100);
  res.json({ success: isPrime(number) });
});

app.get("/rename", (req, res) => {
  renameCount++;
  const newName = `${req.query.name}-${fibonacci(renameCount)}`;
  res.json({ rename: newName });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
