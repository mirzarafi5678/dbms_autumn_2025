

exports.login = (req, res, next) => {
  res.render('store/logIn', {
    pageTitle: 'Login Page'
  });
};

exports.signup=(req, res , next ) => {
   
    res.render('store/signup', {
    pageTitle: 'Sign Page'
  });


}

exports.homeindex=(req, res , next ) => {
   
    res.render('store/home', {
    pageTitle: 'Home Page'
  });


}




