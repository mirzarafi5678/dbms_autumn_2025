// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module


const AdminRouter = require("./routes/AdminRouter")
const InvestorRouter= require("./routes/InvestorRouter")
const ManagerRouter= require("./routes/ManagerRouter")


const AuthRouter = require("./routes/AuthRouter")
const errorsController = require("./controllers/errors");
const rootDir = require("./utils/pathUtil");



// const db = require("./utils/sql")
// db.execute('SELECT * FROM users').then(([a,b]) =>{
//   console.log('getting from db',a)
// } ).catch(error =>{
//   console.log('this is the error-', error)
// })


const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (from fetch/AJAX)
app.use(express.json());





app.use("/Admin",AdminRouter);
app.use("/investor",InvestorRouter)

app.use("/manager",ManagerRouter)

app.use(AuthRouter)


app.use(errorsController.pageNotFound);







const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

