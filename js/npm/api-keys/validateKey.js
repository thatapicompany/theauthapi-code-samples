require("dotenv").config();
//import TheAuthAPI from "theauthapi";
const TheAuthAPI = require("theauthapi").default; //for older setups
const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

theAuthAPI.apiKeys
  .isValidKey(process.env.TEST_KEY)
  .then((isValidKey) => {
    if (isValidKey) {
      console.log(isValidKey);
    } else {
      console.log("Invalid API key!");
    }
  })
  .catch((error) => {
    console.error(error);
  });
