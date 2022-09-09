require("dotenv").config();
const express = require("express");
const TheAuthAPI = require("theauthapi").default;
const ApiResponseError = require("theauthapi/dist/services/ApiRequest/ApiResponseError").default
const ApiRequestError = require("theauthapi/dist/services/ApiRequest/ApiRequestError").default

const app = express();
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

app.use(async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).send({
      message: "No API key, be sure to set it as the 'x-api-key' header",
    });
  }
  try {
    const authenticatedKey = await theAuthAPI.apiKeys.authenticateKey(apiKey);
    req.user = {
      accountId: authenticatedKey.customAccountId,
      userId: authenticatedKey.customUserId,
      ...authenticatedKey.customMetaData,
    };
    next();
  } catch (error) {
    if (error instanceof ApiResponseError) {
      // handle response error
      if (error.statusCode === 404) {
        res.status(401).send({ message: "Invalid API key" });
      } else if (error.statusCode === 429) {
        res.status(429).send({message: "Too many requests try again later"});
      } else {
        // handle 401, 403 errors (these should not occur if you did setup your configs correctly
      }
    } else if (error instanceof ApiRequestError) {
      // handle network error
      res.status(503).send({message: "Unexpected network error, try again later"});
    } else {
      // handle unknown error
      res.status(500).send({message: 'Internal Server Error'});
    }
  }
});

app.get("/", (req, res) => {
  res.send("success");
});


app.listen(3010, () => console.log('server started on http://localhost:3010'));
