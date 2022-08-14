require("dotenv").config();
const TheAuthAPI = require("theauthapi").default;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN);

theAuthAPI.apiKeys
  .isValidKey(process.env.TEST_KEY)
  .then((isValidKey) => {
    if (isValidKey) {
      console.log("The API Key is valid!");
    } else {
      console.log("Invalid API key!");
    }
  })
  .catch((error) => {
    console.error(error);
  });
