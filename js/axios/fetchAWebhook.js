import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function featchAllApiKeys() {
  try {
    return axios
      .get(apiUrl + "/webhooks/" + process.env.WEBHOOK_ID, {
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
  const allKeys = await featchAllApiKeys();
  console.log(allKeys.data);
})();
