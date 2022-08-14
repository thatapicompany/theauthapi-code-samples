const axios = require("axios");
require("dotenv").config();

const accessKey =
  "live_access_tsUTXAb38F59y0uT5vXYh30ceVXSgHuyuxBjPWOqe3Gamu60bqPQ1Vrud7OoNo6Q"; //process.env.ACCESS_TOKEN;

async function authApiKey(apiKey) {
  try {
    const { data } = await axios.get(
      "https://staging-api.theauthapi.com/api-keys/auth/" + apiKey,
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
    "live_3haYyNgeZ6ISfGOnIDlIBlAsXLg1cA8QhVcJsQF2CHsPqwaPgLPfxcQ2Lvs5AtHE"
  ); //process.env.TEST_KEY);
  console.log(validateKey);
})();
