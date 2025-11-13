exports.ProfileInfo = (req, res, next) => {
  

  res.render('store/Manager-ejs/Manager-profileInfo', {
    pageTitle: 'Admin',
    currentPage: 'profile-info',
    ProfileInfo: []
    
  });
}

exports.analytic = (req, res, next) => {
  // fetch StockList and PriceList from DB
  const StockList = [
    { companyId: 'AAPL', totalShare: 500, currentPrice: 180 },
    { companyId: 'GOOGL', totalShare: 300, currentPrice: 1250 },
  ];

  const PriceList = [
    { historyId: 1, stockId: 'AAPL', date: '2025-11-01', open: 175, close: 180, volume: 1000 },
    { historyId: 2, stockId: 'AAPL', date: '2025-11-02', open: 180, close: 182, volume: 1200 },
  ];

  res.render('store/Manager-ejs/Manager-Analytics', {
    pageTitle: 'Admin',
    currentPage: 'analytics',
    StockList,
    PriceList
  });
};

exports.viewStackHolder = (req, res, next) => {
  

  res.render('store/Manager-ejs/Manager-viewStack', {
    pageTitle: 'Admin',
    currentPage: 'view-stakeholder',
    InvestorList : [],
    
   StakeholderList: []
    
  });
}
