// Authentication middleware
module.exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
};

module.exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  // If logged in but not admin, send forbidden or redirect
  if (req.session && req.session.user) {
    return res.status(403).send('Forbidden: Admins only');
  }
  return res.redirect('/login');
};


module.exports.isInvestor = (req, res, next) => {
     console.log("id deklo",req.session.user)
  if (req.session && req.session.user && req.session.user.role === 'investor') {
    return next();
  }
  // If logged in but not admin, send forbidden or redirect
  if (req.session && req.session.user) {
    return res.status(403).send('Forbidden: Admins only');
  }
  return res.redirect('/login');
};

module.exports.isCompanyRep = (req, res, next) => {
     console.log("Comapny id deklo",req.session.user)
  if (req.session && req.session.user && req.session.user.role === 'companyRep') {
    return next();
  }
  // If logged in but not admin, send forbidden or redirect
  if (req.session && req.session.user) {
    return res.status(403).send('Forbidden: Admins only');
  }
  return res.redirect('/login');
};

