const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.post("/bfhl", (req, res) => {
  try {
    const inputData = req.body.data;

    if (!Array.isArray(inputData)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array"
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    inputData.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);  
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });


    const concat_string = alphabets
      .join("")         
      .split("")        
      .reverse()         
      .map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: "rushabh_wagh_20122002",
      email: "rushabhwagh125@gmail.com",
      roll_number: "22BCE10364",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Server error",
      error: error.message
    });
  }
});



module.exports = app;
