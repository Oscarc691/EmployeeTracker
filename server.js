const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'q',
      database: 'tracking_db'
    },
    (err, result) => {
        if (err) {
            console.error(err)
            throw err;
        }
        console.log(`Connected to the movies_db database.`)
    }
  );

function veiwdepartment() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        startingQues()
    });
}

function veiwRoles() {
    db.query('SELECT * FROM role JOIN department ON department.id = role.department_id', function (err, results) {
        console.table(results);
        startingQues()
    });
}

function startingQues() {
    inquirer
  .prompt([

    {
      type: 'list',
      message: 'what will you like to do?',
      name: 'selection',
      choices: ['Veiw all departments', 'view all roles', 'Add department', ""],
    },
  ])
  .then((data) => {
        if (data.selection == 'Veiw all departments') {
            veiwdepartment()
        }
        else if (data.selection == 'view all roles') {
            veiwRoles()
        }
   
  });
}

startingQues()