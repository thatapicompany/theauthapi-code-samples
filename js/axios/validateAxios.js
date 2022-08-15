import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function authApiKey(apiKey) {
  try {
    return axios
      .get(apiUrl + "/api-keys/auth/" + apiKey, {
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
    console.log(error);
  }
}

(async () => {
  const validateKey = await authApiKey(process.env.TEST_KEY);
  console.log(validateKey.headers, validateKey.data);
})();
