const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json())

const connection = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'agil'
})

connection.connect();

app.get('/', (req,res) => {
    res.send(`<html>
        <body>
            <form action="/todo" method="post">
                <input name="deskripsi" />
                <button>Add</button>
            </form>
        </body>
    </html>`)
})

app.post('/todo', (req,res) => {
    var params = req.body.deskripsi
        connection.query("insert into bebas values(null, ?)", params, (err, rows, fields) =>{
            if(err) throw err
                res.end()
        })
})

app.get('/todo', (req, res, fields) => {
        connection.query('SELECT deskripsi from bebas', (err, rows, fields) =>{
            if(err) throw err
            rows = JSON.stringify(rows);
            res.send(rows)
        })
})

app.delete('/todo/:id', (req, res) => {
    var sql = `DELETE FROM todo WHERE id = ${req.params.id}`;
	con.query(sql)
	res.end()
})

app.listen(3000, function(err){
    console.log("Server started");
})