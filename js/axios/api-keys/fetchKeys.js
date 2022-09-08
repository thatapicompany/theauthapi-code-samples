import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function fetchApiKeys(filters) {
  try {
    const {data} = await axios
      .get(`${apiUrl}/api-keys?${filters}`, {
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
const filters = "";
//const filters = "?name=sdfsdfsdfsdf&isActive=false";
//const filters = "?isActive=false";
//const filters = "?customAccountId=VALUE";
//const filters = "?customUserId=VALUE";

(async () => {
  const apiKeys = await fetchApiKeys(filters);
  console.log(apiKeys);
})();
