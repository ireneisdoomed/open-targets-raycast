import fetch from 'node-fetch';

async function QuerySearch(input: string): Promise<any> {
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

async function renderData(input: string): Promise<any> {
    const apiResponse = await QuerySearch(input);
    const hit = apiResponse.data.search.hits;
    return hit;
}

export async function run(input: string) {
    const data = await renderData(input);
    const result = data.map((item: any) => {

        const { id, name, entity } = item;
        
        const url =`https://platform.opentargets.org/${entity}/${id}/associations`
    
       return {id, name, url, entity};
    });
    return result;
}
