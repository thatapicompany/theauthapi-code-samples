const express = require("express");
const app = express();
//import TheAuthAPI from "theauthapi";
const TheAuthAPI = require("theauthapi").default; //for older setups

const theAuthAPI = new TheAuthAPI(
  process.env.ACCESS_TOKEN
);

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
        res.status(500).send({ message: "Error validating API key" });
      });
  } else {
    res.status(401).send({
      message: "No API key, be sure to set it as the 'x-api-key' header",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3010);
