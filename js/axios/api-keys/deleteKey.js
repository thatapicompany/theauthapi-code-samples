import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;

async function deleteKey(apiKey) {
  try {
    const { data } = await axios
      .delete(apiUrl + "/api-keys/" + apiKey, {
        headers: {
          ContentType: "application/json",
          "x-api-key": accessKey,
        },
      })
    return data;
  } catch (error) {
    // handle error
    if (error.response) {
      console.log(error.response.data);
    }
  }
}

(async () => {
  const deleted = await deleteKey(process.env.TEST_KEY);
  console.log('key has been deleted?', deleted);
})();
