const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

console.log(outputPath);
const render = require("./lib/htmlRenderer");

const team = [];
const questions = [
  {
    type: "input",
    name: "managerName",
    message: "What is the team manager's name?",
  },
  {
    type: "input",
    name: "managerId",
    message: "What is the manager's employee Id?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is the manager's email address?",
  },
  {
    type: "list",
    name: "managerOfficeNumber",
    message: "What is the manager's office number?",
    choices: [1, 2, 3, 4],
  },
  {
    type: "input",
    name: "engineerName",
    message: "Who is the team engineer?",
  },
  {
    type: "input",
    name: "engineerId",
    message: "What is the engineer's employee Id?",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is the engineer's email address?",
  },
  {
    type: "input",
    name: "engineerGithub",
    message: "What is the engineer's github username?",
  },
  {
    type: "input",
    name: "internName",
    message: "Who is the team intern?",
  },
  {
    type: "input",
    name: "internId",
    message: "What is the intern's employee Id?",
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is the intern's email address?",
  },
  {
    type: "input",
    name: "internSchool",
    message: "What school did the intern attend?",
  },
];
const promptUser = () => inquirer.prompt(questions);

const init = async () => {
  try {
    const response = await promptUser();

    const manager = new Manager(
      response.managerName,
      response.managerId,
      response.managerEmail,
      response.managerOfficeNumber
    );

    const engineer = new Engineer(
      response.engineerName,
      response.engineerId,
      response.engineerEmail,
      response.engineerGithub
    );

    const intern = new Intern(
      response.internName,
      response.internId,
      response.internEmail,
      response.internSchool
    );

    team.push(manager, engineer, intern);

    writeFileAsync("team.html", render(team));

    console.log("Successfully wrote to team.html");
  } catch (err) {
    console.log(err);
  }
};

init();
// const e = new Engineer("Hannah Folk", 1, "hfolk25@gmail.com", "hannahfolk");
// team.push(e);
// fs.writeFile("team.html", render(team), function (err) {
//   if (err) throw err;
//   console.log("success!");
// });

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
