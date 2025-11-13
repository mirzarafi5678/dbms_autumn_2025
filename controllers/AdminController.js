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

exports.PredictionStockPricet=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-PricePrediction', {
    pageTitle: 'Admin',
    currentPage : 'Prediction-of-Stock-Price',
    PredictionList : []
  });
}

exports.Userdetails=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-UserDetail', {
    pageTitle: 'Admin',
    currentPage : 'User-details',
   InvestorList : [],
   TransactionList:[],
   StakeholderList: []
  });
}

