import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
async function deleteKey(apiKey) {
  try {
    return axios
      .delete(apiUrl + "/api-keys/" + apiKey, {
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
  const deleteKeyResults = await deleteKey(process.env.TEST_KEY);
  console.log(deleteKeyResults.data, deleteKeyResults.headers);
})();
