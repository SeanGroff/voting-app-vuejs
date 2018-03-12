import { gql } from 'apollo-boost'

export default gql`
  mutation addOption($pollId: String!, $optionName: String!) {
    addOption(pollId: $pollId, optionName: $optionName) {
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
