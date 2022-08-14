import TheAuthAPI from "theauthapi";

const theAuthAPI = new TheAuthAPI(process.env.ACCESS_TOKEN);

async function createApiKeySample() {
  try {
  const key = await theAuthAPI.apiKeys.createKey({
    projectId: process.env.PROJECT_ID, //replace with your project id
    customMetaData: { metadata_val: "value to store" },
    customAccountId: "any info you want",
    name: "any info you want e.g. name of customer or the key",
  });
    console.log("Key created > ", key);
  } catch (error) {
    console.log("Couldn't make the key ", error);
  }
}
