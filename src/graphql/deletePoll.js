import { gql } from 'apollo-boost'

export default gql`
  mutation deletePoll($pollId: String!) {
    removePoll(pollId: $pollId) {
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
        voters {
          id
        }
      }
    }
  }
`
