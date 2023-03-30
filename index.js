const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');
require('dotenv').config();
var connection;
async function connectDB() {
    connection = await mysql.createConnection({ host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'company_db'});
    app()
}

// question declarations
const deptQ = [
{
    name: 'deptName',
    message: 'What is this department called?',
    type: 'input'
}
];

const roleQ = (departmentChoices) => [{
    name: 'title',
    message: 'What is this role called?',
    type: 'input'
},
{
    name: 'salary',
    message: "Please enter this role's salary as a decimal.",
    type: 'input'
},
{
    name: "dept_id",
    message: "What department does this employee occupy?",
    type: "list",
    choices: departmentChoices
}
];

const employeeQ = (roleChoices) => [{
    name: 'id',
    type: 'input',
    message: "What is this employee's id number"
},
{
    name: 'firstName',
    type: 'input',
    message: "What is this employee's first name?"
},
{
    name: 'lastName',
    type: 'input',
    message: "What is this employee's last name?"
},
{
    name: 'role',
    type: 'list',
    message: "What is this employee's role?",
    choices: roleChoices
}
];

const updateQ = (employeeChoices, roleChoices) => [{
    name: 'employee',
    type: 'list',
    message: "Which employee would you like to update?",
    choices: employeeChoices
},
{
    name: 'newRole',
    type: 'list',
    message: "What is this employee's new role?",
    choices: roleChoices
}];

// query function declarations
const allDept = async () => {
    try {
        console.log("Getting all departments.")
        const [depts,fields] = await connection.execute('SELECT * FROM departments')
        console.table(depts)
        app()
    } catch (error) {
        console.log(error)
    }
};

const allRoles = async () => {
    try {
        console.log('Getting all roles.')
        const [roles, fields] = await connection.execute('SELECT * FROM roles')
        console.table(roles)
        app()
    } catch (error) {
        console.log(error)
    }
};

const allEmp = async () => {
    try {
        console.log('Getting all employees.')
        const [employees, fields] = await connection.execute('SELECT * FROM employees')
        console.table(employees)
        app()
    } catch (error) {
        console.log(error)
    }
};

const addDept = async () => {
    const {deptName} = await getAnswer(deptQ);
    try {
        console.log("Getting all departments")
        const [rows,fields] = await connection.execute(`INSERT INTO departments (dept_name) VALUES ("${deptName}")`)
        console.table(rows)
        app()
    } catch (error) {
        console.log(error)
    }
};

const addRole = async () => {
    const [depts,fields] = await connection.execute('SELECT * FROM departments')
    try {
        formattedDepts = depts.map(element => {
            return {
            name: element.dept_name,
            value: element.id
        }
        })
        const answers = await getAnswer(roleQ(formattedDepts));
        const [roles, fields] = await connection.execute(`INSERT INTO roles (title, salary, dept_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.dept_id})`)
        console.log(answers) // title, salary props
        app()
    } catch (error) {
        console.log(error)
    } 
};

const addEmp = async () => {
    const [roles, fields] = await connection.execute('SELECT * FROM roles')
    try {console.log(roles)
        formattedRoles = roles.map(element => {
            return {
                name: element.title,
                value: element.id
            }
        })
        const answers = await getAnswer(employeeQ(formattedRoles))
        const [employee, fields] = await connection.execute(`INSERT INTO employees (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.role})`)
        console.table(answers)
        app()
    } catch (error) {
        console.log(error)
    }
};

const updateRole = async () => {
    const [employees, fields] = await connection.execute('SELECT * FROM employees')
    const [roles] = await connection.execute('SELECT * FROM roles')
    try {console.table(employees)
        formattedEmployees = employees.map(element => {
            return {
                name: element.first_name + element.last_name,
                value: element.id 
            }
        })
        formattedRoles = roles.map(element => {
            return {
                name: element.title,
                value: element.id
            }
        })
        const answers = await getAnswer(updateQ(formattedEmployees,formattedRoles))
        const [employee, fields] = await connection.execute(`UPDATE employees SET role_id = ${answers.newRole} WHERE id = ${answers.employee}`)
        console.table(answers)
        app()
    } catch (error) {
        console.log(error)
    }
};

// answer helper function
getAnswer = async (q) => {    
    return await inquirer.prompt(q);
}

// init function
const app = async () => {
    const {start} = await getAnswer({
        name: 'start',
        type: 'list',
            choices: [ 
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    })
        switch (start) {
            case 'View all departments':
                return allDept()
                case 'View all roles':
                    return allRoles()
                case 'View all employees':
                    return allEmp()
                case "Add a department":
                    return addDept()
                case 'Add a role':
                    return addRole()
                case 'Add an employee':
                    return addEmp()
                case 'Update an employee role':
                    return updateRole()
                default:
                break;
            }
    }

    connectDB()