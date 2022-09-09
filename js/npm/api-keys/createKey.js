require("dotenv").config();
const TheAuthAPI = require("theauthapi").default; //for older setups

const apiUrl = process.env.production
  ? "https://api.theauthapi.com"
  : process.env.TESTING_URL;
const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN, { host: apiUrl });

async function createApiKeySample() {
  try {
    const key = await theAuthAPI.apiKeys.createKey({
      name: "API-KEY-NAME",
      customUserId: "nick@theauthapi.com",
      customAccountId: "123",
      key: "KEY-UID-" + Math.random(),
      customMetaData: {
        featureFlagOne: true,
        featureFlagTwo: false,
      },
      expiry: new Date("2023-09-01 00:00:00"), // optional expiry date
      rateLimitConfigs: {
        rateLimit: 60,
        rateLimitTtl: 60,
      },
    });
    console.log("Key created > ", key);
  } catch (error) {
    console.log("Couldn't make the key ", error);
  }
}

(async () => {
  await createApiKeySample();
})();
