exports.Dashboard = (req, res, next) => {
  res.render('store/CompanyRepresentative-ejs/CompanyRep-Dasboard', {
    pageTitle: 'CompanyRep',
    currentPage: 'dashboard',
    stocks: [],              // array of { companyName, totalShares, currentPrice }
    stockTransactions: []    // array of { numberOfInvestors, timestamp }
  });
};
