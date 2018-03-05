import { gql } from 'apollo-boost'

export default gql`
  query getPoll($pid: String!) {
    poll(pid: $pid) {
      id
      createdBy {
        id
        name
        email
      }
      name
      votes
      url
      pollOptions {
        id
        name
        votes
      }
    }
  }
`
