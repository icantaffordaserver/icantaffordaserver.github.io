import gql from 'graphql-tag'

import connectionsFragment from '../fragments/connectionsFragment'

export default gql`
  fragment getUpcomingConnections on Query {
    upcoming: allConnectionses(
      filter: { status: SCHEDULED, participants_some: { id: $id } }
      orderBy: connectionTime_ASC
    ) {
      ...connectionDetails
    }
  }
  ${connectionsFragment}
`
