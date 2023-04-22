import gql from "graphql-tag";

export const FILE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    SingleUpload(file: $file) {
      filename
      success
      imageLink
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($filename: String!) {
    DeleteFile(filename: $filename) {
      success
      message
      code
    }
  }
`;
