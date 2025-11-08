

exports.login = (req, res, next) => {
  res.render('store/Auth-ejs/logIn', {
    pageTitle: 'Login Page'
  });
};

exports.signup=(req, res , next ) => {
   
    res.render('store/Auth-ejs/signup', {
    pageTitle: 'Sign Page'
  });


}

exports.homeindex=(req, res , next ) => {
   
    res.render('store/home', {
    pageTitle: 'Home Page'
  });


}




