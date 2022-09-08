import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function createApiKey(apiKey) {
  try {
    const { data } = await axios
      .post(apiUrl + "/api-keys", apiKey, {
        headers: {
          ContentType: "application/json",
          "x-api-key": accessKey,
        },
      });
    return data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else {
      // handle other errors
    }
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
    rateLimit: 120,
    rateLimitTtl: 60,
  },
};

(async () => {
  const createdKey = await createApiKey(myKey);
  console.log(createdKey);
})();
