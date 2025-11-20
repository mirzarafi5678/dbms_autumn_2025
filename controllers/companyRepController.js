exports.Dashboard = (req, res, next) => {
  

  res.render('store/CompanyRepresentative-ejs/CompanyRep-Dasboard', {
    pageTitle: 'CompanyRep',
    currentPage: 'dashboard',
   
  });
};
