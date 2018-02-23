import { gql } from 'apollo-boost'

export default gql`
  query getPolls($uid: String) {
    polls(uid: $uid) {
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