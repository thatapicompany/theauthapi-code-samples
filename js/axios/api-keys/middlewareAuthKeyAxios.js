import express from "express";
const app = express();
import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

app.use(function async(req, res, next) {
  if (req.headers["x-api-key"]) {
    try {
      axios
        .get(apiUrl + "/api-keys/auth/" + req.headers["x-api-key"], {
          headers: {
            ContentType: "application/json",
            access_key: accessKey,
          },
        })
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
        })
        .catch(function (error) {
          res.status(401).send({ message: "Error validating API key" });
        });
    } catch (error) {
      res.status(401).send({ message: "Error validating API key" });
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
