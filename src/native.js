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
    const exam = await QuerySearch(input);
    const hit = exam.data.search.hits[0];
    console.log("renderData result", hit);
    return hit;
}

async function returnUrl(input) {
    const data = await renderData(input);
    const id = data.id
    const name = data.name
    const entity = data.entity

    const uri_a = "https://platform.opentargets.org/" + entity + "/" + id
    const uri_b = "https://platform.opentargets.org/search?q=" + input + "&page=1"

    const result = name == input ? uri_a : uri_b

    console.log("returnUrl result", result)
    return result;

}

async function main(input) {
    const response = await renderData(input);
    const result = await returnUrl(response);
    console.log("main result", result);
    return result;
}

const input = 'PCSK9';
returnUrl(renderData(input), input);