// const fetch = require("node-fetch");

// ✅ Proper fetch import for Node v22 (CJS)
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// ✅ Your Gemini API key

const db = require("../utils/db");
// Temporary storage for fraud data
let fraudData = [];

exports.viewAudit = async (req, res, next) => {
  try {
    // Fetch institutions from `institute` table
    const [institutions] = await db.execute(`
      SELECT id, name, licenseNumber, type
      FROM institute
      ORDER BY name
    `);

    // Fetch audit reports from `report` table
    const [auditReportsRaw] = await db.execute(`
      SELECT auditName, auditDate, findingsSummary, reportId, registrationNumber
      FROM report
      ORDER BY auditDate DESC
    `);

    // Ensure auditDate is a JS Date object for EJS `toDateString()` usage
    const auditReports = (auditReportsRaw || []).map(r => {
      return {
        ...r,
        auditDate: r.auditDate ? new Date(r.auditDate) : null
      };
    });

    res.render('store/Investor-ejs/Investor-Audit', {
      pageTitle: 'Investor',
      currentPage: 'viewAudit',
      institutions: institutions || [],
      auditReports: auditReports || []
    });
  } catch (err) {
    console.error('Error fetching institutes or reports:', err);
    res.render('store/Investor-ejs/Investor-Audit', {
      pageTitle: 'Investor',
      currentPage: 'viewAudit',
      institutions: [],
      auditReports: []
    });
  }
};




exports.Dashboard = async (req, res, next) => {
  try {
    // 1️⃣ Daily Transaction Volume
    const [dailyVolume] = await db.execute(`
      SELECT DATE(timestamp) AS day, SUM(amount) AS totalAmount
      FROM stocks_transaction
      GROUP BY DATE(timestamp)
      ORDER BY day;
    `);

    // 2️⃣ Predicted Prices
    const [predictions] = await db.execute(`
      SELECT registrationNumber, predictedPrice
      FROM prediction
      ORDER BY predictedPrice DESC
      LIMIT 10;
    `);

    res.render("store/Investor-ejs/Investor-Dashboard", {
      pageTitle: 'Investor',
      currentPage: 'dashboard',
      dailyVolume,
      predictions
    });

  } catch (err) {
    console.log(err);
  }
};



exports.buyStock = async (req, res, next) => {
     console.log("controller er moddhe asi",req.session.user)
  try {
    // Fetch company list from `company` table
    const [CompanyList] = await db.execute(`
      SELECT registrationNumber, name, sector, contactInfo
      FROM company
      ORDER BY name
    `);

    // Fetch stock list from `stocks` table
    const [StockList] = await db.execute(`
      SELECT registrationNumber, stockId, totalShares, currentPrice
      FROM stocks
      ORDER BY stockId
    `);

    res.render('store/Investor-ejs/Investor-buyStock', {
      pageTitle: 'Investor',
      currentPage: 'buyStock',
      CompanyList: CompanyList || [],
      StockList: StockList || []
    });
  } catch (err) {
    console.error('Error fetching companies or stocks:', err);
    // Render view with empty lists as a safe fallback
    res.render('store/Investor-ejs/Investor-buyStock', {
      pageTitle: 'Investor',
      currentPage: 'buyStock',
      CompanyList: [],
      StockList: []
    });
  }
};


// Handle buy post from investor front-end
exports.postBuyStock = async (req, res) => {


   console.log("stock kintasi",req.session.userid)
  
  try {
    const { stockId, amount } = req.body;

    // Minimal validation
    if (!stockId || !amount) {
      return res.status(400).json({ error: 'stockId and amount are required' });
    }

    // Require logged-in user (iUserId) from session
    const iUserId = req.session.user.userid ;
    if (!iUserId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Find registrationNumber from stocks table
    const [stockRows] = await db.execute('SELECT registrationNumber FROM stocks WHERE stockId = ?', [stockId]);
    if (!stockRows || stockRows.length === 0) {
      return res.status(400).json({ error: 'Invalid stockId' });
    }
    const registrationNumber = stockRows[0].registrationNumber;

    // Create transactionId and timestamp
    const transactionId = 'T' + Date.now().toString();
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL DATETIME format

    // Insert into stocks_transaction
    await db.execute(
      'INSERT INTO stocks_transaction (transactionId, timestamp, amount, stockId, iUserId, registrationNumber) VALUES (?, ?, ?, ?, ?, ?)',
      [transactionId, timestamp, amount, stockId, iUserId, registrationNumber]
    );

    console.log('Transaction inserted:', { transactionId, stockId, iUserId, registrationNumber, amount });

    res.json({ success: true, transactionId, stockId, amount, registrationNumber });
  } catch (err) {
    console.error('Error handling buy-stock:', err);
    res.status(500).json({ error: 'Server error' });
  }
};




exports.stockTN = (req, res, next) => {
  const transactionList = [
    { tid: 'T001', stockId: 'S001', investorId: 'INV-001', amount: 1000 },
    { tid: 'T002', stockId: 'S002', investorId: 'INV-002', amount: 500 },
  ];

  res.render('store/Investor-ejs/Investor-stockTN', {
    pageTitle: 'Investor',
    currentPage: 'stock-transaction',
    transactionList
  });
};

exports.postStockTN = (req, res, next) => {
  const { tid, stockId, investorId, amount } = req.body;
  const newTransaction = { tid, stockId, investorId, amount };
  res.status(200).json(newTransaction);
};


exports.FruadDetection = (req, res) => {
  const transactionList = [
    { tid: 'T001', stockId: 'S001', investorId: 'INV-001', amount: 1000 },
    { tid: 'T002', stockId: 'S002', investorId: 'INV-002', amount: 500 },
  ];

  const fraudList = [
    {
      alertId: 'F001',
      tid: 'T001',
      riskScore: 0.85,
      accuracyScore: 0.92,
      detectionDate: '2025-11-12',
      summary: 'Suspicious large amount'
    }
  ];

  res.render('store/Investor-ejs/Investor-FruadDetection', {
    pageTitle: 'Investor',
    currentPage: 'fraud-detection',
    transactionList,
    fraudList: [...fraudList, ...fraudData]
  });
};
const GEMINI_API_KEY = "AIzaSyCOJyUBQEa84SmEWmrO1aiyyUwaUJiACeY";



exports.AiDetect = async (req, res) => {
  const { tid, stockId, investorId, amount } = req.body;

  try {
    const prompt = `
      You are a fraud detection AI.
      Analyze the transaction:
      TID=${tid}, StockID=${stockId}, InvestorID=${investorId}, Amount=${amount}.
      Generate:
      - Risk Score (0-1)
      - Accuracy Score (0-1)
      - Summary
      Respond in plain text like this:
      Risk Score: <value>
      Accuracy Score: <value>
      Summary: <text>
    `;

    const response = await fetch(
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-chat-1.5-flash-preview-05-20:generateContent?key=" + GEMINI_API_KEY
,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      return res.status(500).json({ error: "Invalid response from Gemini API", details: data });
    }

    const aiText = data.candidates[0].content.parts[0].text;

    const riskMatch = aiText.match(/Risk Score\s*[:\-]\s*([0-9.]+)/i);
    const accuracyMatch = aiText.match(/Accuracy Score\s*[:\-]\s*([0-9.]+)/i);
    const summaryMatch = aiText.match(/Summary\s*[:\-]\s*(.+)/i);

    const result = {
      riskScore: riskMatch ? parseFloat(riskMatch[1]) : 0,
      accuracyScore: accuracyMatch ? parseFloat(accuracyMatch[1]) : 0,
      detectionDate: new Date().toISOString().split("T")[0],
      summary: summaryMatch ? summaryMatch[1].trim() : aiText
    };

    res.json(result);
  } catch (err) {
    console.error("Gemini AI detection error:", err);
    res.status(500).json({ error: "AI detection failed" });
  }
};


exports.AddFraud = (req, res) => {
  const data = req.body;
  const alertId = `F${fraudData.length + 1}`;
  const newFraud = { alertId, ...data };
  fraudData.push(newFraud);
  res.json(newFraud);
};

