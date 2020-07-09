// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");


class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        //super.getRole();
        return 'Intern';
    }
}

//var interns = new Intern('Jake', 1, 'jschollmeier@gmail.com','Wisconsin');

//console.log(interns.getRole())
//console.log(interns.getSchool());
//console.log(interns.getEmail());

module.exports = Intern;