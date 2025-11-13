exports.Dashboard = (req, res, next) => {
  

  res.render('store/Manager-ejs/Manager-Dashboard', {
    pageTitle: 'Admin',
    currentPage: 'dashboard',
    
  });
}


