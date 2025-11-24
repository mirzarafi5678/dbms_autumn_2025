
const db = require("../utils/db");

exports.Dashboard = (req, res, next) => {
  const CompanyStockList = [
    { Apple: 120 },
    { Google: 80 },
    { Microsoft: 150 }
  ];

  const MovePriceList = [
    { Day1: 120 },
    { Day2: 130 },
    { Day3: 125 }
  ];

  res.render('store/Admin-ejs/Admin-Dashboard', {
    pageTitle: 'Admin',
    currentPage: 'dashboard',
    CompanyStockList,
    MovePriceList
  });
}

exports.comapanyStockManagement=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-Company-Stock-Management', {
    pageTitle: 'Admin',
    currentPage : 'Company-Stock-Management',
    CompanyList: [],
    StockList:[]
  });

}
exports.AduitReportManagement=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-AuditReport', {
    pageTitle: 'Admin',
    currentPage : 'Audit-Report-Management',
    InstituteList: [],
    AuditList:[]
  });
}

exports.PriceMonitoring=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-Price-monitoring', {
    pageTitle: 'Admin',
    currentPage : 'Price-Monitoring',
    PriceList : []
  });
}


exports.TradeManagement=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-TradeManagement', {
    pageTitle: 'Admin',
    currentPage : 'Trade-Management',
    Trades : []
  });
}

exports.AIBasedFraudDetection=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-FruadDetect', {
    pageTitle: 'Admin',
    currentPage : 'AI-Based-Fraud-Detection',
    FraudList : []
  });
}

exports.PredictionStockPricet = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM stock_predictions");

        res.render('store/Admin-ejs/Admin-PricePrediction', {
            pageTitle: 'Admin',
            currentPage: 'Prediction-of-Stock-Price',
            PredictionList: rows
        });

    } catch (err) {
        console.error(err);
        res.send("Database Error");
    }
};

// SEARCH
exports.searchPredictions = async (req, res) => {
    const query = req.query.query;

    try {
        const [rows] = await db.query(
            "SELECT * FROM stock_predictions WHERE Stockid LIKE ?", [`%${query}%`]
        );

        res.render('store/Admin-ejs/Admin-PricePrediction', {
            pageTitle: 'Admin',
            currentPage: 'Prediction-of-Stock-Price',
            PredictionList: rows
        });

    } catch (err) {
        console.error(err);
        res.send("Search Error");
    }
};

// ADD
exports.addPrediction = async (req, res) => {
    const { Stockid, predictedPrice, date, accuracyScore } = req.body;

    try {
        await db.query(
            "INSERT INTO stock_predictions (Stockid, predictedPrice, date, accuracyScore) VALUES (?, ?, ?, ?)",
            [Stockid, predictedPrice, date, accuracyScore]
        );

        res.redirect('/admin/Prediction-of-Stock-Price');

    } catch (err) {
        console.error(err);
        res.send("Insert Error");
    }
};

// EDIT
exports.editPrediction = async (req, res) => {
    const Stockid = req.params.Stockid;
    const { predictedPrice, date, accuracyScore } = req.body;

    try {
        await db.query(
            "UPDATE stock_predictions SET predictedPrice=?, date=?, accuracyScore=? WHERE Stockid=?",
            [predictedPrice, date, accuracyScore, Stockid]
        );

        res.redirect('/admin/Prediction-of-Stock-Price');

    } catch (err) {
        console.error(err);
        res.send("Update Error");
    }
};

// DELETE
exports.deletePrediction = async (req, res) => {
    const Stockid = req.params.Stockid;

    try {
        await db.query("DELETE FROM stock_predictions WHERE Stockid = ?", [Stockid]);

        res.redirect('/admin/Prediction-of-Stock-Price');

    } catch (err) {
        console.error(err);
        res.send("Delete Error");
    }
};

exports.Userdetails=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-UserDetail', {
    pageTitle: 'Admin',
    currentPage : 'User-details',
   InvestorList : [],
   TransactionList:[],
   StakeholderList: []
  });
}

