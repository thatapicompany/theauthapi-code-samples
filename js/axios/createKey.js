import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;

async function createApiKey(apiKey) {
  try {
    return axios
      .post("https://staging-api.theauthapi.com/api-keys", apiKey, {
        headers: {
          ContentType: "application/json",
          "x-api-key": accessKey,
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    // handle error
  }
}

const myKey = {
  name: "API-KEY-NAME",
  customUserId: "nick@theauthapi.com",
  customAccountId: "123",
  key: "KEY-UID-" + Math.random(),
  customMetaData: {
    featureFlagOne: true,
    featureFlagTwo: false,
  },
  expiry: "2022-09-01 00:00:00", // optional expiry date
  rateLimitConfigs: {
    rateLimit: 600,
    rateLimitTtl: 60,
  },
};

(async () => {
  const createdKey = await createApiKey(myKey);
  console.log(createdKey.data, createdKey.headers);
})();
