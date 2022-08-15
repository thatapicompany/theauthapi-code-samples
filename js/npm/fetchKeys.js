require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

theAuthAPI.apiKeys
  .getKeys()
  .then((keys) => {
    console.log(`Total keys: ${keys.length}`);
    console.log(keys);
  })
  .catch((error) => {
    console.error(error);
  });
