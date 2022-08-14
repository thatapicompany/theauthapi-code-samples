import axios from "axios";

const accessKey = [ACCESS_KEY]; //replace with your access key;

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
    projectId: [PROJECT_ID], //replace with your project id
};

(async () => {
    const createdKey = await createApiKey(myKey);
    console.log(createdKey);
})();
