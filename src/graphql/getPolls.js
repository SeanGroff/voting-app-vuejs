import { gql } from 'apollo-boost'

export default gql`
  query getPolls($uid: String) {
    polls(uid: $uid) {
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
