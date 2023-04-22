import moment from "moment";
import { S3_BASE_URL } from "../config";

export function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export const formatDate = (data, format = "ll") => {
  return moment(data).format(format);
};

export const formatImage = (name) => {
  return S3_BASE_URL + "/" + name;
};
