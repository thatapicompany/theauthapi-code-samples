require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;
const ApiResponseError = require("theauthapi/dist/services/ApiRequest/ApiResponseError").default;
const ApiRequestError = require("theauthapi/dist/services/ApiRequest/ApiRequestError").default;

const apiUrl = process.env.production
    ? "https://api.theauthapi.com"
    : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });


async function updateKeySample() {
  try {
    const updatedKey = await theAuthAPI.apiKeys.updateKey(process.env.TEST_KEY, {
      name: "update api key sample",
      key: "custom_key_1",
      rateLimitConfigs: {
        rateLimit: 50,
        rateLimitTtl: 120,
      }
    });
    console.log(updatedKey);
  } catch (error) {
    console.log(error);
    if (error instanceof ApiResponseError) {
      // handle response error
    } else if (error instanceof ApiRequestError) {
      // handle network error
    } else {
      // handle unknown error
    }
  }
}

(async () => {
  await updateKeySample();
})();
