import gql from "graphql-tag";

export const USER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      code
      success
      message
      user {
        _id
        firstname
        lastname
        email
        avater
        phone
        role
        dept
        faculty
        status
      }
      token
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation Register($userInput: RegistrationInput) {
    Register(userInput: $userInput) {
      code
      success
      message
    }
  }
`;

export const VERIFFICATION_CODE = gql`
  mutation Verify2FCode($code: String!) {
    Verify2FCode(code: $code) {
      code
      success
      message
      user {
        _id
        firstname
        lastname
        email
        avater
        phone
        role
        dept
        status
      }
      token
    }
  }
`;

export const ADMIN_FORGOT_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    ForgetPassword(email: $email) {
      code
      success
      message
    }
  }
`;

export const USER_LOGOUT = gql`
  mutation Logout($code: String) {
    Logout(code: $code) {
      code
      message
      success
    }
  }
`;

export const GET_VERIFICATION_LINK = gql`
  mutation userGetVerificationLink($email: String) {
    userGetVerificationLink(email: $email) {
      msg
      code
    }
  }
`;

export const ADMIN_RESET_PASSWORD = gql`
  mutation ResetPassowrd($newPassword: String!, $securityCode: String!) {
    ResetPassowrd(newPassword: $newPassword, securityCode: $securityCode) {
      code
      success
      message
    }
  }
`;

export const USER_VERIFY_EMAIL = gql`
  mutation verifyEmail($securityCode: String!) {
    VerifyEmail(securityCode: $securityCode) {
      code
      success
      message
    }
  }
`;

export const CONFIRM_EMAIL_CHANGE = gql`
  mutation ConfirmChangeEmail($securityCode: String!) {
    ConfirmChangeEmail(securityCode: $securityCode) {
      code
      success
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation ProfileUpdate($userInput: UserProfileUpdateInput) {
    ProfileUpdate(userInput: $userInput) {
      code
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($oldPassword: String!, $newPassword: String!) {
    PassowrdUpdate(oldPassword: $oldPassword, newPassword: $newPassword) {
      code
      message
      success
    }
  }
`;

export const CHANGE_EMAIL = gql`
  mutation ChangeEmail($newEmail: String, $password: String) {
    ChangeEmail(newEmail: $newEmail, password: $password) {
      code
      message
      success
    }
  }
`;

// export const REGISTER_USER = gql`
//   mutation Register($userInput: RegistrationInput) {
//     Register(userInput: $userInput) {
//       code
//       message
//       success
//     }
//   }
// `;

export const FETCH_USER_BY_ID = gql`
  query FetchUserById($id: ID) {
    FetchUserById(id: $id) {
      code
      message
      success
      user {
        casualLeave
        privilegedLeave
        medicalLeave
        maternityLeave
        paternityLeave
        studyLeave
      }
    }
  }
`;
