const axios = require("axios");
require("dotenv").config();

const accessKey =
  process.env.ACCESS_TOKEN;

async function authApiKey(apiKey) {
  try {
    const { data } = await axios.get(
      "https://api.theauthapi.com/api-keys/auth/" + apiKey,
      {
        headers: {
          ContentType: "application/json",
          "x-api-key": accessKey,
        },
      }
    );
    return console.log(data);
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  const validateKey = await authApiKey(
    process.env.TEST_KEY
  ); //process.env.TEST_KEY);
  console.log(validateKey);
})();
