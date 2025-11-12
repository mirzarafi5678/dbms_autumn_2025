exports.Dashboard=(req, res , next ) => {
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
    currentPage:'dashboard',
    CompanyStockList,
    MovePriceList
  
  });

}

exports.profile = (req, res, next) => {
  // Example: suppose you have user data in req.user or fetched from DB
  const userdetails = {
    id: 'INV-001',
    name: 'John Doe',
    contact: '+880123456789'
  };

  res.render('store/Investor-ejs/Investor-profile', {
    pageTitle: 'Investor',
    currentPage: 'profile',
    userdetails // 👈 Pass this to EJS
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




// const fetch = require("node-fetch");

// Your Gemini API key
const GEMINI_API_KEY = "AIzaSyCOJyUBQEa84SmEWmrO1aiyyUwaUJiACeY";

// Temporary storage for fraud data
let fraudData = [];

// Render Fraud Detection page
exports.FruadDetection = (req, res) => {
  const transactionList = [
    { tid: 'T001', stockId: 'S001', investorId: 'INV-001', amount: 1000 },
    { tid: 'T002', stockId: 'S002', investorId: 'INV-002', amount: 500 },
  ];

  const fraudList = [
    { alertId: 'F001', tid: 'T001', riskScore: 0.85, accuracyScore: 0.92, detectionDate: '2025-11-12', summary: 'Suspicious large amount' }
  ];

  res.render('store/Investor-ejs/Investor-FruadDetection', {
    pageTitle: 'Investor',
    currentPage: 'fraud-detection',
    transactionList,
    fraudList: [...fraudList, ...fraudData]
  });
};

// AI Fraud Detection using Gemini
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

    const response = await fetch("https://gemini.googleapis.com/v1/models/text-bison-001:generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.5,
        max_output_tokens: 200
      })
    });

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return res.status(500).json({ error: "No response from Gemini API" });
    }

    const aiText = data.candidates[0].content;

    // Parse Gemini AI response
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

// Add fraud detection to table
exports.AddFraud = (req, res) => {
  const data = req.body;
  const alertId = `F${fraudData.length + 1}`;
  const newFraud = { alertId, ...data };
  fraudData.push(newFraud);
  res.json(newFraud);
};
