import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function fetchTopics() {
  try {
    const { data } = await axios
      .get(apiUrl + "/webhooks/topics", {
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

//fetch all webhook topics
(async () => {
  const topics = await fetchTopics();
  console.log(topics);
})();
