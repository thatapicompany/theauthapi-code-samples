import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function reactivateKey(apiKey) {
  try {
    const {data}  = await axios
      .patch(`${apiUrl}/api-keys/${apiKey}/reactivate`, {},{
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
      // handle other error types
    }
  }
}

(async () => {
  const reactivatedApiKey = await reactivateKey(process.env.TEST_KEY);
  console.log(reactivatedApiKey);
})();
