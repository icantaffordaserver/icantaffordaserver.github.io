/**
 * Created by alexandermann on 2017-03-09.
 */
import gql from 'graphql-tag';

export default gql`
  mutation createConnection($connection: CreateConnectionsInput!) {
    createConnections(input: $connection) {
      changedEdge {
        node {
          id
        }
      }
    }
  }
`;