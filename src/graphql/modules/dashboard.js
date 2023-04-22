import gql from "graphql-tag";

export const GET_DASHBOARD_DATA = gql`
  query {
    GetDashboardData {
      cards {
        name
        count
      }
      monthlyPermits {
        month
        numberOfPermits
      }
      message
      success
      code
    }
  }
`;
