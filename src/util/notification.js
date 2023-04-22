import { notification } from "antd";

export const notify = ({ success, message } = {}, successCallback) => {
  if (success) {
    notification.success({
      message,
      placement: "bottomRight",
    });
    if (typeof successCallback === "function") {
      successCallback();
    }
  } else {
    notification.error({
      message,
      placement: "bottomRight",
    });
  }
};

export const successNotify = (message) => {
  notification.success({
    message,
    placement: "bottomRight",
  });
};

export const warnNotify = (message) => {
  notification.warn({
    message,
    placement: "bottomRight",
  });
};

export const errorNotify = (message) => {
  notification.error({
    message,
    placement: "bottomRight",
  });
};
