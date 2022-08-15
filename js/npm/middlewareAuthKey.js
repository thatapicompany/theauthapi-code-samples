const express = require("express");
const app = express();
require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

app.use(function (req, res, next) {
  if (req.headers["x-api-key"]) {
    theAuthAPI.apiKeys
      .authenticateKey(req.headers["x-api-key"])
      .then((key) => {
        if (!key) {
          res.status(401).send({ message: "Invalid API key" });
        }
        req.user = {
          accountId: key.customAccountId,
          userId: key.customUserId,
          ...key.customMetaData,
        };
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send({ message: "Error validating API key" });
      });
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
