import { ApolloClient, InMemoryCache, gql, HttpLink, useQuery} from '@apollo/client'

const client = new ApolloClient({
    link: new HttpLink({uri: 'https://api.platform.opentargets.org/api/v4/graphql'}),
    cache: new InMemoryCache(),
  });

const queryString = "PCSK9"

function QuerySearch($queryString: String!) {
    const query = gql`
    query searchTerm($queryString: String!) {
        search(queryString: $queryString){
            hits {
            id
            name
            entity
            }
        }
    }
    `

    const { loading, error, data } = useQuery(query);

    const id = data?.search?.hits[0]?.id
    const name = data?.search?.hits[0]?.name
    const entity = data?.search?.hits[0]?.entity

    var uri_a = "https://platform.opentargets.org/" + entity + "/" + id
    var uri_b = "https://platform.opentargets.org/search?q=" + queryString + "&page=1"

    var result = name == queryString ? uri_a : uri_b

    return result
  }