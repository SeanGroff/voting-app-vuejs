import { gql } from 'apollo-boost'

export default gql`
  mutation deletePoll($pollId: String!) {
    removePoll(pollId: $pollId) {
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
