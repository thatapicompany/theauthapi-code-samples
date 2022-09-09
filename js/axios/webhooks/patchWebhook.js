import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function patchWebhook(webhookId, webhookData) {
  try {
    const { data } = await axios
      .patch(`${apiUrl}/webhooks/${webhookId}`, webhookData, {
        headers: {
          ContentType: "application/json",
          "x-api-key": accessKey,
        },
      })
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
  status: "paused", // can be "live" or "paused"
};
(async () => {
  const updatedWebhook = await patchWebhook(process.env.WEBHOOK_ID, webhookData);
  console.log(updatedWebhook);
})();
