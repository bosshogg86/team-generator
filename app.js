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
const render = require("./lib/htmlRenderer");

const team = [];
const managerQuestions = [
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
];

const engineerQuestions = [
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
];

const internQuestions = [
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
];

const add = [
  {
    type: "list",
    name: "addEmployee",
    message: "Do you have another employee to enter?",
    choices: ["yes", "no"],
  },
];

const which = [
  {
    type: "list",
    name: "employee",
    message: "Which type of employee do you want to enter?",
    choices: ["engineer", "intern"],
  },
];

const managerPrompt = () => inquirer.prompt(managerQuestions);
const engineerPrompt = () => inquirer.prompt(engineerQuestions);
const internPrompt = () => inquirer.prompt(internQuestions);
const addPrompt = () => inquirer.prompt(add);
const whichPrompt = () => inquirer.prompt(which);

const init = async () => {
  try {
    // Creates manager
    const m = await managerPrompt();
    const manager = new Manager(m.name, m.id, m.email, m.officeNumber);
    team.push(manager);
    let addRes = await addPrompt();

    while (addRes.addEmployee === "yes") {
      const which = await whichPrompt();

      // Creates engineer
      if (which.employee === "engineer") {
        const e = await engineerPrompt();
        const engineer = new Engineer(e.name, e.id, e.email, e.github);
        team.push(engineer);
        addRes = await addPrompt();

        // Creates intern
      } else {
        const i = await internPrompt();
        const intern = new Intern(i.name, i.id, i.email, i.school);
        team.push(intern);
        addRes = await addPrompt();
      }
    }

    // Creates output folder if it does not exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    // Writes file
    writeFileAsync(outputPath, render(team));

    console.log("Successfully wrote to team.html");
  } catch (err) {
    console.log(err);
  }
};

init();
