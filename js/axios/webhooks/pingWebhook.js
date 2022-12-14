import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function pingWebhook(webhookData) {
  try {
    const { data } = await axios
      .post(apiUrl + "/webhooks/ping", webhookData, {
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

const webhookData = {
  url: "https://webhook.site/a61857c1-ead8-4c2a-86a3-ebc910db2271",
  httpMethod: "POST", // http method of the request sent to the webhook
  customHeaders: {
    // custom headers added to the request sent to the webhook
    a_random_number: "WEBHOOK-UID-" + Math.random(),
  },
  body: { a_random_number: "WEBHOOK-UID-" + Math.random() }, //any value you want to test
};

(async () => {
  const pingTest = await pingWebhook(webhookData);
  console.log(pingTest);
})();
