const express = require("express");
const app = express();
const axios = require("axios");

const accessKey = process.env.ACCESS_TOKEN;

app.use(function async(req, res, next) {
  if (req.headers["x-api-key"]) {
    try {
      axios
        .get(
          "https://api.theauthapi.com/api-keys/auth/" +
            req.headers["x-api-key"],
          {
            headers: {
              ContentType: "application/json",
              access_key: accessKey,
            },
          }
        )
        .then((data) => {
          if (!data.data.key) {
            return res.status(401).send({ message: "Invalid API key" });
          }
          req.user = {
            accountId: data.data.customAccountId,
            userId: data.data.customUserId,
            ...data.data.customMetaData,
          };
          next();
        });
    } catch (error) {
      res.status(500).send({ message: "Error validating API key" });
    }
  } else {
    res.status(401).send({
      message: "No API key, be sure to set it as the 'x-api-key' header",
    });
  }
});

app.get("/", (req, res) => {
  res.send("success");
});

app.listen(3010);
