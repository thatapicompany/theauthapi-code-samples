require("dotenv").config();
const TheAuthAPI = require("theauthapi").default; //for older setups
const ApiResponseError = require("theauthapi/dist/services/ApiRequest/ApiResponseError").default;
const ApiRequestError = require("theauthapi/dist/services/ApiRequest/ApiRequestError").default;

const apiUrl = process.env.production
    ? "https://api.theauthapi.com"
    : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

async function deleteKeySample() {
  try {
    const deleted = await theAuthAPI.apiKeys.deleteKey(process.env.TEST_KEY);
    console.log('API key has been deleted?', deleted);
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
  await deleteKeySample();
})();
