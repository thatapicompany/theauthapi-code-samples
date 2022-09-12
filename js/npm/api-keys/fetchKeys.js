require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;

const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

async function fetchKeysSample() {
  // fetch all api keys
  const apiKeys = await theAuthAPI.apiKeys.getKeys();
  console.log("all keys", apiKeys);

  // fetch keys with a specific name (1st one from the list returned previously)
  const nameFilteredKeys = await theAuthAPI.apiKeys.getKeys({
    name: apiKeys[0].name,
  });
  console.log("Keys filtered using name", nameFilteredKeys);

  // fetch keys where customUserId is null
  const customUserIdFilteredKey = await theAuthAPI.apiKeys.getKeys({
    customUserId: "null",
  });
  console.log("Keys filtered using customUserId", customUserIdFilteredKey);

  // fetch inactive (revoked) keys
  const inactiveKeys = await theAuthAPI.apiKeys.getKeys({
    isActive: false,
  });
  console.log("Inactive (revoked) keys", inactiveKeys);
}

(async () => {
  await fetchKeysSample();
})();
