import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
async function deleteWebhook(hook) {
  try {
    return axios
      .delete(apiUrl + "/webhooks/" + hook, {
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
  const deleteHook = await deleteWebhook(process.env.WEBHOOK_ID);
  console.log(deleteHook.data, deleteHook.headers);
})();
