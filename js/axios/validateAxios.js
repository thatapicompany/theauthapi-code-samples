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
        //console.log("catch 1", error.response);
        throw new Error(error.response.status);
      });
  } catch (error) {
    console.log("catch 2", error.response);
  }
}

(async () => {
  authApiKey(process.env.TEST_KEY)
    .then(function (response) {
      console.log(response.headers, response.data);
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });
})();
