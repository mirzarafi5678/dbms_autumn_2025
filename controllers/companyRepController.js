
const db = require("../utils/db");


exports.Dashboard = async (req, res, next) => {
  try {
    const rUserId = req.session.user.userid;

    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (repRows.length === 0) {
      return res.render('store/CompanyRepresentative-ejs/CompanyRep-Dasboard', {
        pageTitle: 'CompanyRep',
        currentPage: 'dashboard',
        stocks: [],
        stockTransactions: []
      });
    }

    const registrationNumber = repRows[0].registrationNumber;

    // fetch company name
    const [companyRows] = await db.execute('SELECT name FROM company WHERE registrationNumber = ?', [registrationNumber]);
    const companyName = companyRows.length > 0 ? companyRows[0].name : registrationNumber;

    // fetch stocks for this company
    const [stockRows] = await db.execute('SELECT stockId, totalShares, currentPrice FROM stocks WHERE registrationNumber = ?', [registrationNumber]);
    const stocks = (stockRows || []).map(s => ({ companyName, stockId: s.stockId, totalShares: s.totalShares, currentPrice: s.currentPrice }));

    // aggregate transactions: number of distinct investors per day (or timestamp)
    const [txAgg] = await db.execute(
      `SELECT DATE(timestamp) AS ts, COUNT(DISTINCT iUserId) AS numberOfInvestors
       FROM stocks_transaction
       WHERE registrationNumber = ?
       GROUP BY DATE(timestamp)
       ORDER BY DATE(timestamp) DESC
       LIMIT 30`,
      [registrationNumber]
    );

    const stockTransactions = (txAgg || []).map(r => ({ numberOfInvestors: r.numberOfInvestors, timestamp: r.ts }));

    res.render('store/CompanyRepresentative-ejs/CompanyRep-Dasboard', {
      pageTitle: 'CompanyRep',
      currentPage: 'dashboard',
      stocks,
      stockTransactions
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.render('store/CompanyRepresentative-ejs/CompanyRep-Dasboard', {
      pageTitle: 'CompanyRep',
      currentPage: 'dashboard',
      stocks: [],
      stockTransactions: []
    });
  }
};

function generateRandomId(prefix = '') {
  return prefix + Math.floor(1000 + Math.random() * 9000).toString();
}


exports.myCompany = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;

    // find mapping row in company_representative
    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);

    let company = {};
    let stocks = [];

    if (repRows.length > 0) {
      const registrationNumber = repRows[0].registrationNumber;

      const [companyRows] = await db.execute('SELECT registrationNumber, name, sector, contactInfo FROM company WHERE registrationNumber = ?', [registrationNumber]);
      if (companyRows.length > 0) company = companyRows[0];

      const [stockRows] = await db.execute('SELECT stockId, totalShares, currentPrice FROM stocks WHERE registrationNumber = ?', [registrationNumber]);
      stocks = stockRows || [];
    }

    res.render('store/CompanyRepresentative-ejs/CompanyRep-MyCompany', {
      pageTitle: "CompanyRep",
      currentPage: "myCompany",
      company,
      stocks
    });
  } catch (err) {
    console.error('Error loading company page:', err);
    res.render('store/CompanyRepresentative-ejs/CompanyRep-MyCompany', {
      pageTitle: "CompanyRep",
      currentPage: "myCompany",
      company: {},
      stocks: []
    });
  }
};


exports.addCompanyInfo = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;
    const { name, sector, contactInfo } = req.body;

    // create a new registrationNumber
    const registrationNumber = generateRandomId('C');

    // insert company
    await db.execute('INSERT INTO company (registrationNumber, name, sector, contactInfo) VALUES (?, ?, ?, ?)', [registrationNumber, name, sector, contactInfo]);

    // insert or update mapping in company_representative
    const [exists] = await db.execute('SELECT rUserId, name FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (exists.length > 0) {
      // preserve existing representative name; only update registrationNumber
      await db.execute('UPDATE company_representative SET registrationNumber = ? WHERE rUserId = ?', [registrationNumber, rUserId]);
    } else {
      // rep row doesn't exist — use session user name if available, otherwise fallback to submitted name
      const repName = req.session.user && req.session.user.name ? req.session.user.name : (name || '');
      await db.execute('INSERT INTO company_representative (rUserId, registrationNumber, name) VALUES (?, ?, ?)', [rUserId, registrationNumber, repName]);
    }

    res.redirect('/companyRep/my-company');
  } catch (err) {
    console.error('Error adding company:', err);
    res.redirect('/company-rep/my-company');
  }
};


exports.updateCompanyInfo = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;
    const { name, sector, contactInfo } = req.body;

    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (repRows.length === 0) return res.redirect('/company-rep/my-company');

    const registrationNumber = repRows[0].registrationNumber;

    await db.execute('UPDATE company SET name = ?, sector = ?, contactInfo = ? WHERE registrationNumber = ?', [name, sector, contactInfo, registrationNumber]);

    res.redirect('/companyRep/my-company');
  } catch (err) {
    console.error('Error updating company:', err);
    res.redirect('/companyRep/my-company');
  }
};


exports.addStock = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;
    const { totalShares, currentPrice } = req.body;

    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (repRows.length === 0) return res.redirect('/company-rep/my-company');

    const registrationNumber = repRows[0].registrationNumber;
    const stockId = generateRandomId('S');

    await db.execute('INSERT INTO stocks (registrationNumber, stockId, totalShares, currentPrice) VALUES (?, ?, ?, ?)', [registrationNumber, stockId, totalShares, currentPrice]);

    res.redirect('/companyRep/my-company');
  } catch (err) {
    console.error('Error adding stock:', err);
    res.redirect('/companyRep/my-company');
  }
};


exports.updateStock = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;
    const { stockId, totalShares, currentPrice } = req.body;

    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (repRows.length === 0) return res.redirect('/company-rep/my-company');

    const registrationNumber = repRows[0].registrationNumber;

    await db.execute('UPDATE stocks SET totalShares = ?, currentPrice = ? WHERE stockId = ? AND registrationNumber = ?', [totalShares, currentPrice, stockId, registrationNumber]);

    res.redirect('/companyRep/my-company');
  } catch (err) {
    console.error('Error updating stock:', err);
    res.redirect('/companyRep/my-company');
  }
};


exports.deleteStock = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;
    const { stockId } = req.body;

    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (repRows.length === 0) return res.redirect('/company-rep/my-company');

    const registrationNumber = repRows[0].registrationNumber;

    await db.execute('DELETE FROM stocks WHERE stockId = ? AND registrationNumber = ?', [stockId, registrationNumber]);

    res.redirect('/companyRep/my-company');
  } catch (err) {
    console.error('Error deleting stock:', err);
    res.redirect('/companyRep/my-company');
  }
};







exports.recentBuyer = async (req, res) => {
  try {
    const rUserId = req.session.user.userid;

    const [repRows] = await db.execute('SELECT registrationNumber FROM company_representative WHERE rUserId = ?', [rUserId]);
    if (repRows.length === 0) {
      return res.render('store/CompanyRepresentative-ejs/CompanyRep-RecentBuyer', {
        pageTitle: "CompanyRep",
        currentPage: "recentbuyer",
        stockTransactions: [],
        investors: []
      });
    }

    const registrationNumber = repRows[0].registrationNumber;

    // fetch transactions with investor name (if available)
    const [txRows] = await db.execute(
      `SELECT s.transactionId, s.timestamp, s.amount, s.stockId, s.iUserId, s.registrationNumber, i.name AS investorName
       FROM stocks_transaction s
       LEFT JOIN investor i ON s.iUserId = i.iUserId
       WHERE s.registrationNumber = ?
       ORDER BY s.timestamp DESC`,
      [registrationNumber]
    );

    // build investors list (unique)
    const investorMap = new Map();
    txRows.forEach(r => {
      if (r.iUserId && !investorMap.has(r.iUserId)) {
        investorMap.set(r.iUserId, { investorId: r.iUserId, name: r.investorName || '' });
      }
    });

    const investors = Array.from(investorMap.values());

    res.render('store/CompanyRepresentative-ejs/CompanyRep-RecentBuyer', {
      pageTitle: "CompanyRep",
      currentPage: "recentbuyer",
      stockTransactions: txRows,
      investors
    });
  } catch (err) {
    console.error('Error loading recent buyers:', err);
    res.render('store/CompanyRepresentative-ejs/CompanyRep-RecentBuyer', {
      pageTitle: "CompanyRep",
      currentPage: "recentbuyer",
      stockTransactions: [],
      investors: []
    });
  }
};





