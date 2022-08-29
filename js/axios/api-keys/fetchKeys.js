import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function featchAllApiKeys(filters) {
  try {
    return axios
      .get(apiUrl + "/api-keys" + filters, {
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
const filters = "";
//const filters = "?isActive=false";
//const filters = "?customAccountId=VALUE";
//const filters = "?customUserId=VALUE";

(async () => {
  const allKeys = await featchAllApiKeys(filters);
  console.log(allKeys.data);
})();
