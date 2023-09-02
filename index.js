const express = require("express"); // creating a new express instance
const app = express(); // creating a new app instance
const cors = require("cors");
const mysql = require("mysql"); // creating a new mysql instance

app.use(cors()); // to evoid error called cors policy
app.use(express.json());

// when someone trying to reach wrong direction in server, we can set an action for it
app.get("/wrong", (req, res) => {
  res.send("404 page not found... !");
});

// authenticate mysql

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudnewdb",
}); // creating a new db instance

app.get("/", (req, res) => {
  const sqlStatement =
    "INSERT INTO info (idDb, nameDb, departmentDb) VALUES ('001', 'Thanura', 'ICE');";
  db.query(sqlStatement, (error, result) => {
    res.send("data inserted");
  });
});

app.post("/api/insert", (req, res) => {
  const studentId = req.body.studentId;
  const studentName = req.body.studentName;
  const studentDep = req.body.studentDep;

  const sqlStatement =
    "INSERT INTO info (idDb, nameDb, departmentDb) VALUES (?,?,?)";
  db.query(
    sqlStatement,
    [studentId, studentName, studentDep],
    (error, result) => {
      console.log(result);
    }
  );
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM info;";
  db.query(sqlSelect, (error, result) => {
    res.send(result); // send data to front-end
  });
});

// to update existing Degree Program in table

app.put("/api/update", (req, res) => {
  const idDb = req.body.idDb;
  const departmentDb = req.body.departmentDb;
  const sqlUpdate = "UPDATE info SET departmentDb = ? WHERE idDb = ?;";
  db.query(sqlUpdate, [departmentDb, idDb], (error, result) => {
    res.send(result);
  });
});

// delete request (using params method)

app.delete("/api/delete/:idDb", (req, res) => {
    const idDb = req.params.idDb;
    const sqlDelete = "DELETE FROM info WHERE idDb = ?;";
    db.query(sqlDelete, idDb, (error,result) => {
        res.send(result);
    });
});


// select a listning port
app.listen(3001, () => {
  console.log("running on port 3001");
});
