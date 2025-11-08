exports.Dashboard=(req, res , next ) => {
   
    res.render('store/admindash', {
    pageTitle: 'Admin',
    currentPage : 'dashboard'
  });
}