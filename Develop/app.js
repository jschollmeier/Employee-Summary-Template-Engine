const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var id = 0;
var engineers = [];
var interns = [];
var employees = [];
var manager = "";


inquirer.prompt([
{
    type: "input",
    name: "managerName",
    message: "What is your name?"
},
{
    type: "input",
    name: "managerEmail",
    message: "What is your email"
},
{
    type: "input",
    name: "officeNumber",
    message: "What is your office Number?"
}]).then(function(oput){
    
    employees[id] = new Manager(oput.managerName, id, oput.managerEmail, oput.officeNumber);
    id++;
    
    promptFunc()})

function promptFunc(){

    inquirer.prompt([
        {
    type: "checkbox",
    message: "Do you have any more employees?",
    name: "moreEmployees",
    choices: [
        "Yes",
        "No"
    ] 
    }

]).then(function(data){

    moreEmployees(data)})

}
function moreEmployees(data){
    if(String(data.moreEmployees)==='Yes'){
        inquirer.prompt([
            {
                type: "checkbox",
                name: "employeeType",
                message: "What type of employee are you?",
                choices: [
                    "Engineer",
                    "Intern"
                ]
            }
        ]).then(function(datas){
            
            newEngineer(datas)})
    }
    
    else{
        
        var html = render(employees);
        fs.writeFile(outputPath, html, function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("file written")
            }
        })
        
        console.log("your employee page has been created");
    }


}

function newEngineer(datas){
    if(String(datas.employeeType)==='Engineer'){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the employees name?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your employees email?"
                
            },
            {
                type: "input",
                name: "engineerGit",
                message: "What is your engineers github username?"
            }

        ]).then(function(ouput){
            
            
            employees[id] = new Engineer(ouput.engineerName, id, ouput.engineerEmail, ouput.engineerGit);
            console.log(employees[id].getName());
            id++;
            
            
            promptFunc()});

    }
    else{
        newIntern();
    }

}
function newIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the employees name?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your employees email?"
            
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the interns school?"
        }
        
    ]).then(function(output){
        
        employees[id] = new Intern(output.internName, id, output.internEmail, output.internSchool);
        id++;
        
        promptFunc()});
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
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
