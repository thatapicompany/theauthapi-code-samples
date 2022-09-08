import axios from "axios";
import "dotenv/config";

const accessKey = process.env.ACCESS_TOKEN;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const projectId = process.env.PROJECT_ID;

async function fetchApiKeys(filters) {
  try {
    const {data} = await axios
      .get(`${apiUrl}/api-keys${filters ? `?${filters}` : ''}`, {
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

function getFiltersQuery(filters) {
  return Object.entries(filters).map(([key, value]) => `${key}=${value}`)
      .join('&');
}

const filters = "";
//const filters = "?name=sdfsdfsdfsdf&isActive=false";
//const filters = "?isActive=false";
//const filters = "?customAccountId=VALUE";
//const filters = "?customUserId=VALUE";

(async () => {
  // get all keys
  const apiKeys = await fetchApiKeys(filters);
  console.log('All Keys', apiKeys);

  // get keys with a specific name
  const nameFilteredKeys = await fetchApiKeys(getFiltersQuery({
    name: "new api key",
  }));
  console.log('Keys filtered using name', nameFilteredKeys);

  // get keys with a specific name
  const projectCustomUserIdKeys = await fetchApiKeys(getFiltersQuery({
    projectId,
    customUserId: null,
  }));
  console.log('Keys filtered using projectId and customUserId', projectCustomUserIdKeys);
})();
