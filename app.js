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

const managerPrompt = () => inquirer.prompt(managerQuestions);
const engineerPrompt = () => inquirer.prompt(engineerQuestions);
const internPrompt = () => inquirer.prompt(internQuestions);
const addPrompt = () => inquirer.prompt(add);

const whichPrompt = () => inquirer.prompt(which);

const init = async () => {
  try {
    const m = await managerPrompt();

    const manager = new Manager(m.name, m.id, m.email, m.officeNumber);

    team.push(manager);

    let addRes = await addPrompt();

    while (addRes.addEmployee === "yes") {
      const which = await whichPrompt();
      if (which.employee === "engineer") {
        const e = await engineerPrompt();
        const engineer = new Engineer(e.name, e.id, e.email, e.github);
        team.push(engineer);
        addRes = await addPrompt();
      } else {
        const i = await internPrompt();
        const intern = new Intern(i.name, i.id, i.email, i.school);
        team.push(intern);
        addRes = await addPrompt();
      }
    }

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    writeFileAsync(outputPath, render(team));

    console.log("Successfully wrote to team.html");
  } catch (err) {
    console.log(err);
  }
};

init();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
