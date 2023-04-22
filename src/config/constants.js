export const UserRole = {
  Register: "register",
  Lecturar: "lecturer",
  Head: "head",
  Dean: "dean",
};

export const LeaveType = {
  Casual: "casualLeave",
  Previlged: "privilegedLeave",
  Medical: "medicalLeave",
  Maternity: "maternityLeave",
  Paternity: "paternityLeave",
  Study: "studyLeave",
};

export const LeaveMap = {
  casualLeave: "Casual leave",
  privilegedLeave: "Previlged leave",
  medicalLeave: "Medical leave",
  maternityLeave: "Maternity leave",
  paternityLeave: "Paternity leave",
  studyLeave: "Study leave",
};

export const faculties = [
  {
    value: "Modern_Science",
    text: "Faculty of Modern Science",
    dept: [
      { value: "CSE", text: "Computer Science & Engineering" },
      { value: "EEE", text: "Electrical & Electronic Engineering" },
      { value: "Arch", text: "Department of Architecture" },
      { value: "CE", text: "Department of Civil Engineering" },
      { value: "PH", text: "Department of Public Health" },
    ],
  },
  {
    value: "Social_Science",
    text: "Faculty of Social Science",
    dept: [
      { value: "LAW", text: "Department of Law" },
      { value: "IS", text: "Department of Islamic Studies" },
      { value: "Arch", text: "Department of Architecture" },
    ],
  },
  {
    value: "Modern_Language",
    text: "Faculty of Arts and Modern Language",
    dept: [{ value: "ENG", text: "Department of English" }],
  },
  {
    value: "Business_Administration",
    text: "Faculty of Business Administration",
    dept: [
      { value: "BBA", text: "Department of Business Administration" },
      {
        value: "THM",
        text: "Department of Tourism and Hospitality Management",
      },
    ],
  },
];
