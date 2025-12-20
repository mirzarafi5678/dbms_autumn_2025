

const db = require('../utils/db');

exports.login = (req, res, next) => {
  res.render('store/Auth-ejs/logIn', {
    pageTitle: 'Login Page'
  });
};

exports.signup = (req, res, next) => {
  res.render('store/Auth-ejs/signup', {
    pageTitle: 'Sign Page'
  });
};

exports.homeindex = (req, res, next) => {
  res.render('store/home', {
    pageTitle: 'Home Page'
  });
};

// POST /login
exports.postLogin = async (req, res, next) => {
  // Accept either `email` or `username` and either `pass` or `password` from forms
  const email = req.body.email || req.body.username;
  const pass = req.body.pass || req.body.password;
  if (!email || !pass) {
    return res.redirect('/login?error=missing');
  }

  try {
    const [rows] = await db.execute('SELECT userid, email, role FROM users WHERE email = ? AND pass = ?', [email, pass]);
    if (rows && rows.length > 0) {
      console.log(rows)
      // set minimal user session
      req.session.user = {
        userid: rows[0].userid,
        email: rows[0].email,
        role: rows[0].role
      };

      // Redirect admins to admin dashboard; others to home or their area
      if (req.session.user.role === 'admin') {
        return res.redirect('/Admin/dashboard');
      }

      if (req.session.user.role === 'investor') return res.redirect('/investor/dashboard');
      if (req.session.user.role === 'companyRep') return res.redirect('/companyRep/dashboard');

      return res.redirect('/');
    } else {
      return res.redirect('/login?error=invalid');
    }
  } catch (err) {
    console.error('Login error', err);
    return res.redirect('/login?error=server');
  }
};

// POST /signup
exports.postSignup = async (req, res, next) => {
  // Accept `email` or `username` and `password` fields from form
  const email = req.body.email || req.body.username;
  const pass = req.body.pass || req.body.password;
  const name = req.body.name
  let roleIn = req.body.role;

  if (!email || !pass || !roleIn) {
    return res.redirect('/signup?error=missing');
  }

  // Do not allow creating admin accounts via signup
  if (roleIn === 'admin') {
    return res.status(403).send('Signup as admin is not allowed.');
  }

  // Normalize roles to values accepted by DB enum
 let role = 'investor'; // default

if (roleIn === 'investor' || roleIn === 'companyRep') {
  role = roleIn;
}
  // for other values (manager, auditor, etc.) default to 'investor'

  try {
    await db.execute('INSERT INTO users (email, pass, role) VALUES (?, ?, ?)', [email, pass, role]);

    const [rows] = await db.execute('SELECT userid, email, role FROM users WHERE email = ? AND pass = ?', [email, pass]);
    if( rows[0].role=="investor"){
             
     const id = rows[0].userid;
    await db.execute(
    'INSERT INTO investor (iUserId, name) VALUES (?, ?)',
    [id, name]
  );
    }
    if( rows[0].role=="companyRep"){
             
     const rUserId = rows[0].userid;
    await db.execute(
    'INSERT INTO company_representative (rUserId, name) VALUES (?, ?)',
    [rUserId, name]
  );
    }
    
    return res.redirect('/login?created=1');
  } catch (err) {
    console.error('Signup error', err);
    return res.redirect('/signup?error=server');
  }
};




