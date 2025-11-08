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

