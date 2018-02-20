import updateCurrentUser from '@/graphql/resolvers/updateCurrentUser'

export const defaults = {
  currentUser: {
    __typename: 'CurrentUser',
    id: '',
    name: '',
    email: ''
  }
}

export const resolvers = {
  Mutation: {
    updateCurrentUser
  }
}
