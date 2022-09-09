import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
    ? "https://api.theauthapi.com"
    : process.env.TESTING_URL;

async function authenticateKey(apiKey) {
  try {
    const {data: authenticatedKey} = await axios
        .post(`${apiUrl}/api-keys/auth/${apiKey}`, {}, {
          headers: {
            ContentType: "application/json",
            access_key: accessKey,
          },
        })
    return authenticatedKey;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 404) {
        // handle invalid key
      } else if (error.response.status === 429) {
        // handle api key rate limit error
      } else {
        // handle 401, 403 errors (these should not occur if you did setup your configs correctly
      }
    } else if (error.request) {
      // request was never sent to theauthapi, handle request error here
    } else {
      // handle other errors
    }
  }

}

(async () => {
  const authenticatedKey = await authenticateKey(process.env.TEST_KEY);
  console.log(authenticatedKey)
})();
