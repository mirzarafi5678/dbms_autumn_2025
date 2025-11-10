exports.Dashboard=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-Dashboard', {
    pageTitle: 'Admin',
    currentPage : 'dashboard'
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



