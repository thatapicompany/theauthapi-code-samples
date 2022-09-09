require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;

const apiUrl = process.env.production
    ? "https://api.theauthapi.com"
    : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });


async function fetchKeysSample() {
  // fetch all api keys
  const apiKeys = await theAuthAPI.apiKeys.getKeys();
  console.log('all keys', apiKeys);

  // fetch keys with a specific name
  const nameFilteredKeys = await theAuthAPI.apiKeys.getKeys({
    name: "new api key"
  });
  console.log('Keys filtered using name', nameFilteredKeys);

  // fetch keys where customUserId is null
  const projectCustomUserIdKeys = await theAuthAPI.apiKeys.getKeys({
    customUserId: null,
  })
  console.log('Keys filtered using projectId and customUserId', projectCustomUserIdKeys);

  // fetch inactive (revoked) keys
  const inactiveKeys = await theAuthAPI.apiKeys.getKeys({
    isActive: false,
  })
  console.log('Inactive (revoked) keys', inactiveKeys);
}

(async () => {
  await fetchKeysSample();
})();

