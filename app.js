// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module


const Router = require("./routes/manyRouter")

const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");


const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(Router);


app.get('/test', (req, res) => {
     res.render('store/admindash', {
    pageTitle: 'admin'
  })
});


app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

