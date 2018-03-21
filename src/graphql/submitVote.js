import { gql } from 'apollo-boost'

export default gql`
  mutation submitVote($pollId: String!, $pollOption: PollOptionVoteInput!) {
    vote(pollId: $pollId, pollOption: $pollOption) {
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
