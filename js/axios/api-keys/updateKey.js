import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function updateKey(key, apiKeyData) {
  try {
    const { data } = await axios
      .patch(`${apiUrl}/api-keys/${key}`, apiKeyData, {
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

const apiKeyData = {
  name: "UPDATED-API-KEY-NAME",
  customUserId: "nick@theauthapi.com",
};

(async () => {
  const updatedKey = await updateKey(process.env.TEST_KEY, apiKeyData);
  console.log(updatedKey);
})();
