import express from "express";
import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
    ? "https://api.theauthapi.com"
    : process.env.TESTING_URL;
const app = express();

app.use(async (req, res, next) => {
  const apiKey = req.headers["x-api-key"]
  if (!apiKey) {
    return res.status(401).send({
      message: "No API key, be sure to set it as the 'x-api-key' header",
    });
  }
  try {
    const {data: authenticatedKey} = await axios
        .post(`${apiUrl}/api-keys/auth/${apiKey}`, {}, {
          headers: {
            ContentType: "application/json",
            access_key: accessKey,
          },
        })
    req.user = {
      accountId: authenticatedKey.customAccountId,
      userId: authenticatedKey.customUserId,
      ...authenticatedKey.customMetaData,
    };
    next();
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        // handle invalid key
        res.status(401).send({message: "Error validating API key"});
      } else if (error.response.status === 429) {
        // handle api key rate limit error
        res.status(429).send({message: "Too many requests try again later"});
      } else {
        // handle 401, 403 errors (these should not occur if you did setup your configs correctly
      }
    } else if (error.request) {
      // request was never sent to theauthapi, handle request error here
    } else {
      // handle other errors
    }
  }
});

app.get("/", (req, res) => {
  res.send("success");
});

app.listen(3010, () => console.log('server started on http://localhost:3010'));
