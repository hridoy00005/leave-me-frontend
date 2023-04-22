import gql from "graphql-tag";

export const FETCH_MY_DEPT_REQUEST = gql`
  query FetchMyDeptRequest($status: requestStatus, $limit: Int, $offset: Int) {
    FetchMyDeptRequest(status: $status, limit: $limit, offset: $offset) {
      code
      count
      success
      message
      result {
        _id
        leaveType
        startDate
        endDate
        status
        user {
          _id
          firstname
          lastname
          avater
          email
          phone
          status
        }
      }
    }
  }
`;

export const FETCH_ALL_REQUEST = gql`
  query FetchRequest(
    $limit: Int
    $offset: Int
    $filterData: RequestFileterInput
  ) {
    FetchRequest(limit: $limit, offset: $offset, filterData: $filterData) {
      code
      count
      success
      message
      result {
        _id
        leaveType
        startDate
        endDate
        status
        description
        cancellationNote
        user {
          _id
          firstname
          lastname
          avater
          email
          phone
          status
        }
      }
    }
  }
`;

export const SEND_LEAVE_REQUEST = gql`
  mutation SendLeaveRequest(
    $leaveType: LeaveType
    $faculty: String
    $dept: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    SendLeaveRequest(
      leaveType: $leaveType
      startDate: $startDate
      endDate: $endDate
      faculty: $faculty
      dept: $dept
      description: $description
    ) {
      code
      success
      message
    }
  }
`;

export const UPDATE_REQUEST_STATUS = gql`
  mutation UpdateRequestStatus(
    $id: ID
    $status: String
    $cancellationNote: String
  ) {
    UpdateRequestStatus(
      id: $id
      status: $status
      cancellationNote: $cancellationNote
    ) {
      code
      success
      message
    }
  }
`;

export const DELETE_REQUEST = gql`
  mutation DeleteRequest($id: ID) {
    DeleteRequest(id: $id) {
      code
      success
      message
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation UpdateRequest(
    $id: ID
    $leaveType: LeaveType
    $startDate: String
    $endDate: String
    $description: String
  ) {
    UpdateRequest(
      id: $id
      leaveType: $leaveType
      startDate: $startDate
      endDate: $endDate
      description: $description
    ) {
      code
      success
      message
    }
  }
`;

export const FETCH_LEAVE_DAYS = gql`
  query {
    FetchLeavesDays {
      code
      result {
        casualLeave
        privilegedLeave
        medicalLeave
        maternityLeave
        paternityLeave
        studyLeave
      }
      message
      success
    }
  }
`;

export const UPDATE_LEAVE_REQUEST = gql`
  mutation UpdateLeavesDays($inputData: LeaveInput) {
    UpdateLeavesDays(inputData: $inputData) {
      code
      success
      message
    }
  }
`;

export const FETCH_REQUEST_FOR_DOC = gql`
  mutation FetchRequestForDoc(
    $startDate: String
    $endDate: String
    $status: String
  ) {
    FetchRequestForDoc(
      startDate: $startDate
      endDate: $endDate
      status: $status
    ) {
      code
      success
      result {
        _id
        leaveType
        startDate
        endDate
        status
        description
        cancellationNote
        user {
          _id
          firstname
          lastname
          avater
          email
          phone
          status
        }
      }
    }
  }
`;
