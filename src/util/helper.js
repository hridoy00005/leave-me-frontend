import { notification } from "antd";

const endpoint = process.env.REACT_APP_IMAGE_URL || "https://assets.chillfitrave.com/";
const noImage = "/assets/img/noimage.png";
export const getFile = (image) => {
  console.log(image)
  if (!image) return noImage;
  return endpoint + image;
};

export const showNotification = (data) => {
  if (data.success) {
    notification.success({
      message: data.message,
      placement: "bottomLeft",
    });
  } else {
    notification.error({
      message: data.message,
      placement: "bottomLeft",
    });
  }
};

export const Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const AddressRender = (data) => {
  let address = "";
  if (data?.address) {
    address = address.concat(data?.address);
  }
  if (data?.apertment) {
    address = address.concat(" ",data?.apertment);
  }
  if (data?.city) {
    address = address.concat(", ", data.city);
  }
  if (data?.state) {
    address = address.concat(", ", data.state);
  }
  if (data?.zipCode) {
    address = address.concat("-", `${data.zipCode}, US`);
  }
  return address;
};

export const FullName = (data) => {
  let name = "";
  if (data?.firstname) {
    name = name.concat(data?.firstname);
  }
  if (data?.firstname) {
    name = name.concat(" ", data?.lastname);
  }
  return name;
};
