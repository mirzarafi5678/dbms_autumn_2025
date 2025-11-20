exports.Dashboard = (req, res, next) => {
  res.render('store/CompanyRepresentative-ejs/CompanyRep-Dasboard', {
    pageTitle: 'CompanyRep',
    currentPage: 'dashboard',
    stocks: [],              // array of { companyName, totalShares, currentPrice }
    stockTransactions: []    // array of { numberOfInvestors, timestamp }
  });
};



exports.myCompany = (req, res) => {
  res.render('store/CompanyRepresentative-ejs/CompanyRep-MyCompany', {
    pageTitle: "CompanyRep",
    currentPage: "myCompany",
    company: {},          // will hold name, sector, regNumber, contactInfo
    stocks: []            // array of { stockId, totalShares, currentPrice }
  });
};


exports.addCompanyInfo = (req, res) => {
  // db later
  res.redirect('/company-rep/my-company');
};

exports.updateCompanyInfo = (req, res) => {
  // db later
  res.redirect('/company-rep/my-company');
};

exports.addStock = (req, res) => {
  // db later
  res.redirect('/company-rep/my-company');
};

exports.updateStock = (req, res) => {
  // db later
  res.redirect('/company-rep/my-company');
};

exports.deleteStock = (req, res) => {
  // db later
  res.redirect('/company-rep/my-company');
};


exports.recentBuyer = (req, res) => {
  res.render('store/CompanyRepresentative-ejs/CompanyRep-RecentBuyer', {
    pageTitle: "CompanyRep",
    currentPage: "recentbuyer",
    stockTransactions: [], // array of { transactionId, stockId, investorId, companyId, amount, timestamp }
    investors: []         // array of { investorId, name }
  });
};





