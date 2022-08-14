require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN);

theAuthAPI.apiKeys
  .getKeys()
  .then((keys) => {
    console.log(`Total keys: ${keys.length}`);
    console.log(keys);
  })
  .catch((error) => {
    console.error(error);
  });
