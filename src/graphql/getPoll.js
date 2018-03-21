import { gql } from 'apollo-boost'

export default gql`
  query getPoll($pid: String!) {
    poll(pid: $pid) {
      id
      createdBy {
        id
        name
        email
        ip
      }
      name
      votes
      url
      pollOptions {
        id
        name
        votes
        voters {
          ip
        }
      }
    }
  }
`
