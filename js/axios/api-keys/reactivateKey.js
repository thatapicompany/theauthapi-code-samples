import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
async function reactivateKey(apiKey) {
  try {
    return axios
      .patch(apiUrl + "/api-keys/" + apiKey + "/reactivate", {
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

(async () => {
  const reactivateKeyResults = await reactivateKey(process.env.TEST_KEY);
  console.log(reactivateKeyResults);
})();
