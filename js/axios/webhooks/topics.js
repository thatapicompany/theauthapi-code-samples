import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
async function getTopics() {
  try {
    return axios
      .get(apiUrl + "/webhooks/topics", {
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
//fetch all webhook topics
(async () => {
  const topicsData = await getTopics();
  console.log(topicsData.data);
})();
