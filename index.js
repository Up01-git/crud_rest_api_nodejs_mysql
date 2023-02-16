const mysql = require('mysql2');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    port: 3360,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is running at port no : 3000'));


app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE emp_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE emp_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @emp_id = ?;SET @emp_name = ?;";
    mysqlConnection.query(sql, [emp.emp_id, emp.emp_name], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});


app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @emp_id = ?;SET @emp_name = ?;";
    mysqlConnection.query(sql, [emp.emp_id, emp.emp_name], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

// const exp = require('constants');
// const express = require('express');
// const connection = require('./connection');
// const app = express();

// module.exports = app;

// app.use(express.urlencoded({extended: true}));

// app.use(express.json());
