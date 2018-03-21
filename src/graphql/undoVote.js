import { gql } from 'apollo-boost'

export default gql`
  mutation undoVote($pollId: String!, $pollOption: PollOptionVoteInput!) {
    removeVote(pollId: $pollId, pollOption: $pollOption) {
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
