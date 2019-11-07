import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    Authorization: "Bearer fnADcahd1LACCkDpVc2q4U4_op8QA8EOx_UMHeQy",
  },
  fetch,
})
