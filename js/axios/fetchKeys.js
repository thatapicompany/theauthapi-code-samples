const axios = require("axios");
require("dotenv").config();

const accessKey = process.env.ACCESS_TOKEN;

async function featchAllApiKeys() {
  try {
    const { data } = await axios.get(
      "https://api.theauthapi.com/api-keys",
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
  const allKeys = await featchAllApiKeys();
  console.log(allKeys);
})();
