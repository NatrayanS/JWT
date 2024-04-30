const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();

app.get("/", async (req, res) => {
  let token = await jsonwebtoken.sign(
    {
      date: new Date(),
    },
    "iuen2inciwencwunec2"
    /* {
      expiresIn: 60,
    } */
  ); //secretKey
  console.log(token);
  res.json({
    message: "Success",
    token,
  });
});

app.get("/check/:token", async (req, res) => {
  console.log(req.params.token);
  let token = req.params.token;
  try {
    let tokenResult = await jsonwebtoken.verify(token, "iuen2inciwencwunec2");
    console.log(tokenResult);
    if (tokenResult) {
      res.json({
        message: "Success",
        data: new Date(tokenResult.date),
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server listening in PORT 3000");
});
