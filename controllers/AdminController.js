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



