const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const PORT = 2000;
var password = "<PASSWORD>";

const config = {
  user: "SYSTEM",
  password: "admin",
  connectString: "localhost:1521/xe",
};

async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection(config);

    console.log("connected to database");
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM clientacc`);
    console.log(result);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send("query send no rows");
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employess
app.get("/employees", function (req, res) {
  selectAllEmployees(req, res);
});

async function selectEmployeesById(req, res, id) {
  try {
    connection = await oracledb.getConnection(config);
    // run query to get employee with employee_id
    result = await connection.execute(`SELECT * FROM clientacc where id=:id`, [
      id,
    ]);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send("query send no rows");
    } else {
      //send all employees
      console.log(result.rows);
      return res.send(result.rows);
    }
  }
}

//get /employee?id=<id employee>
app.get("/employee", function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send("Query param id is not number");
    return;
  }
  selectEmployeesById(req, res, id);
});

async function insertNewUser(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;

  try {
    connection = await oracledb.getConnection(config);
    result = await connection.execute(
      "insert into clientacc (FIRST_NAME,LAST_NAME,EMAIL,PASSWORD,PHONE) VALUES (:0, :1, :2, :3, :4)",
      [firstName, lastName, email, password, phone], //aici o sa vina req.body.firstName,req.body.lastName,etc
      { autoCommit: true }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      } finally {
        res.send("user inserted");
      }
    }
  }
}

app.post("/signup", (req, res) => {
  // let id = req.body.id;
  // let first_name = req.body.first_name;
  // let last_name = req.body.last_name;

  // if (isNaN(id) && first_name == null && last_name == null) {
  //   res.send("Query param id is not number");
  //   return;
  // }
  insertNewUser(req, res);
});

async function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  //console.log(email + " " + password);

  try {
    connection = await oracledb.getConnection(config);
    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT * FROM clientacc where EMAIL=:0 AND PASSWORD=:1`,
      [email, password],
      { autoCommit: true }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send("query send no rows");
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

app.post("/login", (req, res) => {
  console.log(req.body);
  login(req, res);
});

async function editUser(req, res) {
  try {
    connection = await oracledb.getConnection(config);
    result = await connection.execute(
      "update clientacc set first_name= :0 ,last_name =:1 ,email=:2 ,password=:3 , phone=:4 where id= :5",
      ["BUNA2", "BUNA", "BUNA", "BUNA", "078680", 2], //aici o sa vina req.body.firstName,req.body.lastName,etc
      { autoCommit: true }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      } finally {
        res.send("user edited succesfully");
      }
    }
  }
}

app.post("/signup", (req, res) => {
  insertNewUser(req, res);
});

async function addItem(req, res) {
  let nume = req.body.nume;
  let quantity = req.body.quantity;
  let category = req.body.category;
  let importP = req.body.import;
  let image = req.body.image;
  let pret = req.body.pret;
  //console.log(req.body);

  //console.log(email + " " + password);

  try {
    connection = await oracledb.getConnection(config);
    result = await connection.execute(
      "insert into item (NAME,QUANTITY,CATEGORY,IMPORT,IMAGE,PRICE) VALUES (:0, :1, :2, :3, :4, :5)",
      //["CEVA1", 2, "CEVA", "Da", "Ceva"], //aici o sa vina req.body.firstName,req.body.lastName,etc
      [nume, parseInt(quantity), category, importP, image, parseInt(pret)],
      { autoCommit: true }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      } finally {
        res.send("ItemInserted");
      }
    }
  }
}

async function getAllItems(req, res) {
  try {
    connection = await oracledb.getConnection(config);

    console.log("connected to database");
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM item`);
    console.log(result);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      console.log("nfajfhajs");
      return res.send("query send no rows");
    } else {
      //send all employees
      console.log(result.rows);
      return res.send(result.rows);
    }
  }
}

app.get("/items", (req, res) => {
  console.log("aicisa");
  getAllItems(req, res);
});

app.post("/addItem", (req, res) => {
  //console.log(req.body);
  addItem(req, res);
});

async function updateItem(req, res) {
  let nume = req.body.nume;
  let quantity = req.body.quantity;
  let category = req.body.category;
  let importP = req.body.import;
  let image = req.body.image;
  let id = req.body.id;
  let pret = req.body.pret;
  console.log(req.body);

  //console.log(email + " " + password);

  try {
    connection = await oracledb.getConnection(config);
    // run query to get employee with employee_id
    result = await connection.execute(
      "update Item set name= :0 ,quantity =:1 ,category=:2 ,import=:3 , image=:4, price=:5 where id= :6",
      [nume, parseInt(quantity), category, importP, image, parseInt(pret), id], //aici o sa vina req.body.firstName,req.body.lastName,etc
      { autoCommit: true }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      } finally {
        res.send("user edited succesfully");
      }
    }
  }
}

app.patch("/updateItem", (req, res) => {
  updateItem(req, res);
});

async function deleteItem(req, res) {
  let id = req.body.id;
  //console.log(req.body);
  try {
    connection = await oracledb.getConnection(config);
    // run query to get employee with employee_id
    result = await connection.execute(
      "delete from item where id= :0",
      [parseInt(id)],
      {
        autoCommit: true,
      }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    res.send("delete successfull");
  }
}

app.delete("/deleteItem", (req, res) => {
  //console.log("asfhajkfhaklhfab");
  console.log(req.body);
  deleteItem(req, res);
});

async function PlaceOrder(req, res) {
  let nume = req.body.nume;
  let image = req.body.image;
  let clientId = req.body.clientId;
  let itemId = req.body.itemId;
  let totalPrice = req.body.totalPrice;
  let quantity = req.body.quantity;
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  //console.log(req.body);

  //console.log(email + " " + password);

  try {
    connection = await oracledb.getConnection(config);
    result = await connection.execute(
      "insert into clientOrder (CLIENTiD,TOTALPRICE,PURCHASEDATE) VALUES (:0, :1, :2)",
      //["CEVA1", 2, "CEVA", "Da", "Ceva"], //aici o sa vina req.body.firstName,req.body.lastName,etc
      [clientId, totalPrice, today],
      { autoCommit: true }
    );
    resultOrderId = await connection.execute(
      "SELECT MAX(ID) FROM CLIENTORDER WHERE CLIENTID= :0",
      [clientId]
    );
    //console.log(resultOrderId.rows[0][0]);
    for (let i = 0; i < itemId.length; i++) {
      result1 = await connection.execute(
        "update item set quantity=quantity - :0 where id = :1",
        [quantity[i], itemId[i]],
        {
          autoCommit: true,
        }
      );
    }
    for (let i = 0; i < itemId.length; i++) {
      // console.log(
      //   resultOrderId.rows[0] + "\n" + itemId[i] + "\n" + quantity[i]
      // );
      result2 = await connection.execute(
        "insert into ORDERMITEM (ORDERID,ITEMID,QUANTITY) VALUES (:0, :1, :2)",
        [resultOrderId.rows[0][0], itemId[i], quantity[i]],
        {
          autoCommit: true,
        }
      );
    }
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      } finally {
        res.send("OrderInserted");
      }
    }
  }
}

app.post("/placeOrder", (req, res) => {
  //console.log(req.body);
  PlaceOrder(req, res);
});

async function Orders(req, res) {
  let id = req.body.id;
  //console.log(id);
  //console.log(email + " " + password);

  try {
    connection = await oracledb.getConnection(config);
    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT id,TotalPrice,purchaseDate FROM clientOrder where clientId=:0`,
      [id],
      { autoCommit: true }
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send("query send no rows");
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

app.post("/orders", (req, res) => {
  Orders(req, res);
});

async function OrderDetails(req, res) {
  let id = req.body.orderId;
  //console.log(id);
  //console.log(email + " " + password);

  try {
    connection = await oracledb.getConnection(config);
    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT TotalPrice,purchaseDate, i.id,i.name, i.price, o.quantity FROM clientOrder c, orderMitem o, item i where c.id=o.orderid and o.itemid=i.id and o.orderid= :0 `,
      [id],
      { autoCommit: true }
    );
    console.log("fnajkfbaj");
    return res.send(result.rows);
  } catch (err) {
    //send error message
    console.log("dasfnja");
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
  }
}

app.post("/orderDetails", (req, res) => {
  //console.log(req.body);
  OrderDetails(req, res);
});

app.patch("/users", (req, res) => {
  editUser(req, res);
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Running on port " + PORT);
});
