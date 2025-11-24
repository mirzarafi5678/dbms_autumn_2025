// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module


const AdminRouter = require("./routes/AdminRouter")
const InvestorRouter= require("./routes/InvestorRouter")
const companyRepRouter= require("./routes/companyRepRouter")

// const ManagerRouter= require("./routes/ManagerRouter")


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

// Session support
const session = require('express-session');
app.use(
  session({
    secret: 'change_this_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 hours
  })
);

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect('/login');
    });
});


const islogged = require("./middleware/auth")

app.use("/Admin",islogged.isAuthenticated,AdminRouter);
app.use("/investor",InvestorRouter)
app.use("/companyRep",companyRepRouter)

// app.use("/Manager",ManagerRouter)

app.use(AuthRouter)


app.use(errorsController.pageNotFound);







const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

