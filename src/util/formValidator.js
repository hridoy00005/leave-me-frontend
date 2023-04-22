export const changePasswordValidate = (name, value) => {
  console.log(name, value);
  if (!value) {
    if (name === "oldPassword") return "Old password can't be empty";
    else if (name === "newPassword") return "New Password can't be empty";
  } else {
    if (name === "newPassword" && value.length < 6)
      return "New Password can't be less then 6 character!";
    if (name === "oldPassword" && value.length < 6)
      return "Old Password can't be less then 6 character!";
    return "";
  }
};
