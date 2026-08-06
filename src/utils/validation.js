export const isRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== "";
};

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).trim());
};

export const isValidUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(String(username).trim());
};

export const isValidPassword = (password) => {
  return String(password).length >= 6;
};

export const isValidName = (name) => {
  const regex = /^[a-zA-Z\s]{2,50}$/;
  return regex.test(String(name).trim());
};

export const isValidRollno = (rollno) => {
  const regex = /^[a-zA-Z0-9]{2,20}$/;
  return regex.test(String(rollno).trim());
};

export const isValidMarks = (marks) => {
  const value = Number(marks);
  return !isNaN(value) && value >= 0 && value <= 100;
};

export const isValidSemester = (semester) => {
  const value = Number(semester);
  return Number.isInteger(value) && value >= 1 && value <= 8;
};

export const isValidPhoto = (file) => {
  if (!file) return true;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  return allowedTypes.includes(file.type);
};

export const validateLogin = ({ username, password }) => {
  if (!isRequired(username)) return "Username is required";
  if (!isRequired(password)) return "Password is required";
  return null;
};

export const validateStudent = (
  { rollno, username, name, email, password, program, photo },
  editing
) => {
  if (!isRequired(rollno)) return "Roll No is required";
  if (!isValidRollno(rollno)) return "Roll No must be 2-20 letters, numbers";

  if (!isRequired(username)) return "Username is required";
  if (!isValidUsername(username)) return "Username must be 3-20 letters, numbers or underscore";

  if (!isRequired(name)) return "Name is required";
  if (!isValidName(name)) return "Name must be 2-50 letters";

  if (!isRequired(email)) return "Email is required";
  if (!isValidEmail(email)) return "Enter a valid email";

  if (!editing) {
    if (!isRequired(password)) return "Password is required";
    if (!isValidPassword(password)) return "Password must be at least 6 characters";
  }

  if (!isRequired(program)) return "Program is required";

  if (!isValidPhoto(photo)) return "Photo must be a jpg, png or webp image";

  return null;
};

export const validateAdmin = ({ username, name, email, password }, editing) => {
  if (!isRequired(username)) return "Username is required";
  if (!isValidUsername(username)) return "Username must be 3-20 letters, numbers or underscore";

  if (!isRequired(name)) return "Name is required";
  if (!isValidName(name)) return "Name must be 2-50 letters";

  if (!isRequired(email)) return "Email is required";
  if (!isValidEmail(email)) return "Enter a valid email";

  if (!editing) {
    if (!isRequired(password)) return "Password is required";
    if (!isValidPassword(password)) return "Password must be at least 6 characters";
  }

  return null;
};

export const validateMark = ({ student_id, subject, marks, semester }) => {
  if (!isRequired(student_id)) return "Please select a student";
  if (!isRequired(subject)) return "Subject is required";
  if (!isValidMarks(marks)) return "Marks must be a number between 0 and 100";
  if (!isValidSemester(semester)) return "Semester must be between 1 and 8";
  return null;
};