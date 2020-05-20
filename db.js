var mysql  = require('mysql');  
// Database query
exports.get_all= () =>{
    const conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "P@ssw0rd",
        database: "incidents",
    });
    conn.connect();
conn.query("SELECT * from incidents_list", function (err, rows, fields) {
        if (err) throw err;
        res.json(JSON.stringify(rows));
    });
    conn.end();
}
