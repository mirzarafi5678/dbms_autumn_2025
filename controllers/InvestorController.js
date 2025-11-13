// ✅ Proper fetch import for Node v22 (CJS)
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// ✅ Your Gemini API key


// Temporary storage for fraud data
let fraudData = [];


exports.Dashboard = (req, res, next) => {
  const CompanyStockList = [
    { Apple: 120 },
    { Google: 80 },
    { Microsoft: 150 }
  ];

  const MovePriceList = [
    { Day1: 120 },
    { Day2: 130 },
    { Day3: 125 }
  ];

  res.render('store/Investor-ejs/Investor-Dashboard', {
    pageTitle: 'Investor',
    currentPage: 'dashboard',
    CompanyStockList,
    MovePriceList
  });
};


exports.profile = (req, res, next) => {
  const userdetails = {
    id: 'INV-001',
    name: 'John Doe',
    contact: '+880123456789'
  };

  res.render('store/Investor-ejs/Investor-profile', {
    pageTitle: 'Investor',
    currentPage: 'profile',
    userdetails
  });
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
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=" + GEMINI_API_KEY
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

