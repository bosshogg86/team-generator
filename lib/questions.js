const questions = {
  manager: [
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the manager's employee Id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email address?",
    },
    {
      type: "list",
      name: "officeNumber",
      message: "What is the manager's office number?",
      choices: [1, 2, 3, 4],
    },
  ],

  engineer: [
    {
      type: "input",
      name: "name",
      message: "Who is the team engineer?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's employee Id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email address?",
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's github username?",
    },
  ],

  intern: [
    {
      type: "input",
      name: "name",
      message: "Who is the team intern?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's employee Id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email address?",
    },
    {
      type: "input",
      name: "school",
      message: "What school did the intern attend?",
    },
  ],

  add: [
    {
      type: "list",
      name: "addEmployee",
      message: "Do you have another employee to enter?",
      choices: ["yes", "no"],
    },
  ],

  which: [
    {
      type: "list",
      name: "employee",
      message: "Which type of employee do you want to enter?",
      choices: ["engineer", "intern"],
    },
  ],
};

module.exports = { questions };
