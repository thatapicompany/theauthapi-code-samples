import axios from "axios";

const accessKey = process.env.ACCESS_TOKEN;

async function createApiKey(apiKey) {
    try {
        const { data } = await axios.post(
            'https://api.theauthapi.com/api-keys',
            apiKey,
            {
                headers: {
                    ContentType: "application/json",
                    "x-api-key": accessKey,
                },
            }
        );
        return data;
    } catch (error) {
        // handle error
    }
}

const myKey = {
    name: "Node sample API key",
    projectId: process.env.PROJECT_ID,
};

(async () => {
    const createdKey = await createApiKey(myKey);
    console.log(createdKey);
})();
