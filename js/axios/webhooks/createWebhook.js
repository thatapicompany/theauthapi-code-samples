import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
async function createWebhook(webhookData) {
  try {
    return axios
      .post(apiUrl + "/webhooks", webhookData, {
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
  name: "TEST_HOOK",
  url: "https://webhook.site/a61857c1-ead8-4c2a-86a3-ebc910db2271",
  projectId: process.env.PROJECT_ID,
  topics: [
    "api-key.created",
    "api-key.deleted",
    "api-key.updated",
    "api-key.firstUsed",
    "access-key.created",
    "access-key.updated",
    "access-key.deleted",
    "project.updated",
  ], // list of webhook events with a min length of 1
  httpMethod: "POST", // http method of the request sent to the webhook
  customHeaders: {
    // custom headers added to the request sent to the webhook
    //a_random_number: "WEBHOOK-UID-" + Math.random(),
  },
  status: "live", // can be "live" or "paused"
};
(async () => {
  const createdWebhook = await createWebhook(webhookData);
  console.log(createdWebhook.data, createdWebhook.headers);
})();
