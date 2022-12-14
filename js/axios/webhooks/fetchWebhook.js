import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function fetchWebhook(webhookId) {
  try {
    const { data } = await axios.get(`${apiUrl}/webhooks/${webhookId}`, {
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
(async () => {
  const webhooks = await fetchWebhooks(process.env.PROJECT_ID);
  webhooks.map((id) => {
    console.log("'" + id.id + "',");
  });
  //console.log(webhooks);
})();
