import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
async function createWebhook(webhookData) {
  try {
    return axios
      .patch(apiUrl + "/webhooks/" + process.env.WEBHOOK_ID, webhookData, {
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

const webhookData = {
  status: "paused", // can be "live" or "paused"
};
(async () => {
  const createdWebhook = await createWebhook(webhookData);
  console.log(createdWebhook.data, createdWebhook.headers);
})();
