import { gql } from 'apollo-boost'

export default gql`
  query UsersQuery($uid: String!) {
    user(uid: $uid) {
      id
      email
      name
    }
  }
`
