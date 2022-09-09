import express from "express";
const app = express();
import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

app.use((req, res, next) => {
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
          if (error.response) {
            if (error.response.status === 404) {
              // handle invalid key
              res.status(401).send({ message: "Error validating API key" });
            } else if (error.response.status === 429) {
              // handle api key rate limit error
              res.status(429).send({ message: "Too many requests try again later" });
            } else {
              // handle 401, 403 errors (these should not occur if you did setup your configs correctly
            }
          } else if (error.request) {
            // request was never sent to theauthapi, handle request error here
          } else {
            // handle other errors
          }
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

app.listen(3010, () => console.log('server started on http://localhost:3010'));
