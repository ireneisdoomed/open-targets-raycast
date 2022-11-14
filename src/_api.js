async function QuerySearch(input) {
    try {
        const response = await fetch('https://api.platform.opentargets.org/api/v4/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                query searchTerm($queryString: String!) {
                    search(queryString: $queryString){
                        hits {
                        id
                        name
                        entity
                        }
                    }
                }
                `,
                variables: {
                    queryString: input,
                },
            }),
        });
        const exam = await response.json();
        return exam;
    } catch (error) {
        console.error(error);
    }
}

async function renderData(input) {
    const apiResponse = await QuerySearch(input);
    console.log(typeof apiResponse);
    const hit = apiResponse.data.search.hits[0];
    console.log(hit);
    return hit;
}

async function run(input) {
    const data = await renderData(input);
    const responseId = data.id
    const responseName = data.name
    const responseEntity = data.entity

    const exactUri = "https://platform.opentargets.org/" + responseEntity + "/" + responseId
    const fuzzyUri = "https://platform.opentargets.org/search?q=" + input + "&page=1"

    const result = responseName == input ? exactUri : fuzzyUri;
    console.log(result);
    return result;
}

const input = 'PCSK9';

run(input);
