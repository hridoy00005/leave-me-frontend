import gql from "graphql-tag";

export const FETCH_ALL_USER = gql`
  query FetchUsersAdmin($limit: Int, $offset: Int, $isGuestUser: Boolean) {
    FetchUsersAdmin(limit: $limit, offset: $offset, isGuestUser: $isGuestUser) {
      code
      success
      message
      count
      result {
        _id
        firstname
        lastname
        isGuestUser
        avater
        email
        birthDate
        phone
        createdAt
      }
    }
  }
`;

export const FETCH_ALL_SUBSCRIBER_USER = gql`
  query FetchSubscriberList {
    FetchSubscriberList {
      code
      success
      message
      result {
        _id
        firstname
        lastname
        email
        phone
      }
    }
  }
`;
