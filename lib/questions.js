const validator = require("validator");

const questions = {
  // Manager Questions
  manager: [
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
      validate: nameValidator,
    },
    {
      type: "input",
      name: "id",
      message: "What is the manager's employee Id number?",
      validate: idValidator,
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email address?",
      validate: emailValidator,
    },
    {
      type: "list",
      name: "officeNumber",
      message: "What is the manager's office number?",
      choices: [1, 2, 3, 4],
    },
  ],

  // Engineer Questions
  engineer: [
    {
      type: "input",
      name: "name",
      message: "Who is the team engineer?",
      validate: nameValidator,
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's employee Id number?",
      validate: idValidator,
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email address?",
      validate: emailValidator,
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's github username?",
      validate: userNameValidator,
    },
  ],

  // Intern Questions
  intern: [
    {
      type: "input",
      name: "name",
      message: "Who is the team intern?",
      validate: nameValidator,
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's employee Id number?",
      validate: idValidator,
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email address?",
      validate: emailValidator,
    },
    {
      type: "input",
      name: "school",
      message: "What school did the intern attend?",
      validate: schoolValidator,
    },
  ],

  // Adds Employee
  add: [
    {
      type: "list",
      name: "addEmployee",
      message: "Do you have another employee to enter?",
      choices: ["yes", "no"],
    },
  ],

  // Which Employee to add
  which: [
    {
      type: "list",
      name: "employee",
      message: "Which type of employee do you want to enter?",
      choices: ["engineer", "intern"],
    },
  ],
};

// Validates name
async function nameValidator(input) {
  if (validator.isAlpha(input) !== true) {
    return "Please enter a name";
  }
  return true;
}

// Validates email
async function emailValidator(input) {
  if (validator.isEmail(input) !== true) {
    return "Please enter a valid email address";
  }
  return true;
}

// Validates id
async function idValidator(input) {
  if (validator.isInt(input) !== true) {
    return "Please enter a valid Id number";
  }
  return true;
}

// Validates username
async function userNameValidator(input) {
  if (validator.isAscii(input) !== true) {
    return "Please enter a valid username";
  }
  return true;
}

// Validates school
async function schoolValidator(input) {
  if (validator.isAlpha(input) !== true) {
    return "Please enter the intern's school";
  }
  return true;
}

module.exports = { questions };
