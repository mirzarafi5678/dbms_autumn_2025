
const db = require("../utils/db");

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

  res.render('store/Admin-ejs/Admin-Dashboard', {
    pageTitle: 'Admin',
    currentPage: 'dashboard',
    CompanyStockList,
    MovePriceList
  });
}

exports.comapanyStockManagement = async (req, res, next) => {
    try {
        const [companyRows] = await db.query('SELECT registrationNumber, name, sector, contactInfo FROM company');
        const [stockRows] = await db.query('SELECT registrationNumber, stockId, totalShares, currentPrice FROM stocks');

        res.render('store/Admin-ejs/Admin-Company-Stock-Management', {
            pageTitle: 'Admin',
            currentPage: 'Company-Stock-Management',
            CompanyList: companyRows,
            StockList: stockRows
        });
    } catch (err) {
        console.error(err);
        res.send('Database Error');
    }
};

// COMPANY: search by registrationNumber
exports.searchCompany = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [companyRows] = await db.query('SELECT registrationNumber, name, sector, contactInfo FROM company WHERE registrationNumber LIKE ?', [`%${query}%`]);
        const [stockRows] = await db.query('SELECT registrationNumber, stockId, totalShares, currentPrice FROM stocks');
        res.render('store/Admin-ejs/Admin-Company-Stock-Management', {
            pageTitle: 'Admin',
            currentPage: 'Company-Stock-Management',
            CompanyList: companyRows,
            StockList: stockRows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// COMPANY: add
exports.addCompany = async (req, res) => {
    const { registrationNumber, name, sector, contactInfo } = req.body;
    try {
        await db.query('INSERT INTO company (registrationNumber, name, sector, contactInfo) VALUES (?, ?, ?, ?)', [registrationNumber, name, sector, contactInfo]);
        res.redirect('/Admin/Company-Stock-Management');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// COMPANY: edit (registrationNumber readonly)
exports.editCompany = async (req, res) => {
    const registrationNumber = req.params.registrationNumber;
    const { name, sector, contactInfo } = req.body;
    try {
        await db.query('UPDATE company SET name = ?, sector = ?, contactInfo = ? WHERE registrationNumber = ?', [name, sector, contactInfo, registrationNumber]);
        res.redirect('/Admin/Company-Stock-Management');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// COMPANY: delete by registrationNumber
exports.deleteCompany = async (req, res) => {
    const registrationNumber = req.params.registrationNumber;
    try {
        await db.query('DELETE FROM company WHERE registrationNumber = ?', [registrationNumber]);
        res.redirect('/Admin/Company-Stock-Management');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};

// STOCKS: search by registrationNumber
exports.searchStocks = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [stockRows] = await db.query('SELECT registrationNumber, stockId, totalShares, currentPrice FROM stocks WHERE registrationNumber LIKE ?', [`%${query}%`]);
        const [companyRows] = await db.query('SELECT registrationNumber, name, sector, contactInfo FROM company');
        res.render('store/Admin-ejs/Admin-Company-Stock-Management', {
            pageTitle: 'Admin',
            currentPage: 'Company-Stock-Management',
            CompanyList: companyRows,
            StockList: stockRows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// STOCKS: add
exports.addStock = async (req, res) => {
    const { registrationNumber, stockId, totalShares, currentPrice } = req.body;
    try {
        await db.query('INSERT INTO stocks (registrationNumber, stockId, totalShares, currentPrice) VALUES (?, ?, ?, ?)', [registrationNumber, stockId, totalShares, currentPrice]);
        res.redirect('/Admin/Company-Stock-Management');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// STOCKS: edit (registrationNumber and stockId readonly)
exports.editStock = async (req, res) => {
    const stockId = req.params.stockId;
    const { totalShares, currentPrice } = req.body;
    try {
        await db.query('UPDATE stocks SET totalShares = ?, currentPrice = ? WHERE stockId = ?', [totalShares, currentPrice, stockId]);
        res.redirect('/Admin/Company-Stock-Management');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// STOCKS: delete by stockId
exports.deleteStock = async (req, res) => {
    const stockId = req.params.stockId;
    try {
        await db.query('DELETE FROM stocks WHERE stockId = ?', [stockId]);
        res.redirect('/Admin/Company-Stock-Management');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};
exports.AduitReportManagement=(req, res , next ) => {
    // load institutes and reports
    (async () => {
        try {
            const [instRows] = await db.query('SELECT id, name, licenseNumber, type FROM institute');
            const [reportRows] = await db.query('SELECT reportId, auditName, auditDate, findingsSummary, registrationNumber FROM report');
            res.render('store/Admin-ejs/Admin-AuditReport', {
                pageTitle: 'Admin',
                currentPage: 'Audit-Report-Management',
                InstituteList: instRows,
                AuditList: reportRows
            });
        } catch (err) {
            console.error(err);
            res.send('Database Error');
        }
    })();
}

// INSTITUTE: search by id
exports.searchInstitute = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [instRows] = await db.query('SELECT id, name, licenseNumber, type FROM institute WHERE id LIKE ?', [`%${query}%`]);
        const [reportRows] = await db.query('SELECT reportId, auditName, auditDate, findingsSummary, registrationNumber FROM report');
        res.render('store/Admin-ejs/Admin-AuditReport', {
            pageTitle: 'Admin',
            currentPage: 'Audit-Report-Management',
            InstituteList: instRows,
            AuditList: reportRows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// INSTITUTE: add
exports.addInstitute = async (req, res) => {
    const { name, licenseNumber, type } = req.body;
    try {
        await db.query('INSERT INTO institute (name, licenseNumber, type) VALUES (?, ?, ?)', [name, licenseNumber, type]);
        res.redirect('/Admin/Audit-Report-Management');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// INSTITUTE: edit (id readonly)
exports.editInstitute = async (req, res) => {
    const id = req.params.id;
    const { name, licenseNumber, type } = req.body;
    try {
        await db.query('UPDATE institute SET name = ?, licenseNumber = ?, type = ? WHERE id = ?', [name, licenseNumber, type, id]);
        res.redirect('/Admin/Audit-Report-Management');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// INSTITUTE: delete by id
exports.deleteInstitute = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM institute WHERE id = ?', [id]);
        res.redirect('/Admin/Audit-Report-Management');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};

// REPORTS: search by reportId
exports.searchReports = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [reportRows] = await db.query('SELECT reportId, auditName, auditDate, findingsSummary, registrationNumber FROM report WHERE reportId LIKE ?', [`%${query}%`]);
        const [instRows] = await db.query('SELECT id, name, licenseNumber, type FROM institute');
        res.render('store/Admin-ejs/Admin-AuditReport', {
            pageTitle: 'Admin',
            currentPage: 'Audit-Report-Management',
            InstituteList: instRows,
            AuditList: reportRows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// REPORTS: add
exports.addReport = async (req, res) => {
    const { auditName, auditDate, findingsSummary, registrationNumber } = req.body;
    try {
        await db.query('INSERT INTO report (auditName, auditDate, findingsSummary, registrationNumber) VALUES (?, ?, ?, ?)', [auditName, auditDate, findingsSummary, registrationNumber]);
        res.redirect('/Admin/Audit-Report-Management');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// REPORTS: edit (reportId readonly)
exports.editReport = async (req, res) => {
    const reportId = req.params.reportId;
    const { auditName, auditDate, findingsSummary, registrationNumber } = req.body;
    try {
        await db.query('UPDATE report SET auditName = ?, auditDate = ?, findingsSummary = ?, registrationNumber = ? WHERE reportId = ?', [auditName, auditDate, findingsSummary, registrationNumber, reportId]);
        res.redirect('/Admin/Audit-Report-Management');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// REPORTS: delete by reportId
exports.deleteReport = async (req, res) => {
    const reportId = req.params.reportId;
    try {
        await db.query('DELETE FROM report WHERE reportId = ?', [reportId]);
        res.redirect('/Admin/Audit-Report-Management');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};

exports.PriceMonitoring=(req, res , next ) => {
    // legacy render: now fetch price_history
    (async () => {
        try {
            const [rows] = await db.query('SELECT registrationNumber, stockId, timestamp, open, close, high, low FROM price_history ORDER BY timestamp DESC');
            res.render('store/Admin-ejs/Admin-Price-monitoring', {
                pageTitle: 'Admin',
                currentPage: 'Price-Monitoring',
                PriceList: rows
            });
        } catch (err) {
            console.error(err);
            res.send('Database Error');
        }
    })();
}

// PRICE HISTORY: search by registrationNumber
exports.searchPriceHistory = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [rows] = await db.query('SELECT registrationNumber, stockId, timestamp, open, close, high, low FROM price_history WHERE registrationNumber LIKE ? ORDER BY timestamp DESC', [`%${query}%`]);
        res.render('store/Admin-ejs/Admin-Price-monitoring', {
            pageTitle: 'Admin',
            currentPage: 'Price-Monitoring',
            PriceList: rows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// PRICE HISTORY: add
exports.addPriceRecord = async (req, res) => {
    const { registrationNumber, stockId, timestamp, open, close, high, low } = req.body;
    try {
        await db.query('INSERT INTO price_history (registrationNumber, stockId, timestamp, open, close, high, low) VALUES (?, ?, ?, ?, ?, ?, ?)', [registrationNumber, stockId, timestamp, open, close, high, low]);
        res.redirect('/Admin/Price-Monitoring');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// PRICE HISTORY: edit (registrationNumber, stockId, timestamp readonly)
exports.editPriceRecord = async (req, res) => {
    const stockId = req.params.stockId;
    const { registrationNumber, timestamp, open, close, high, low } = req.body;
    try {
        if (registrationNumber && timestamp) {
            await db.query('UPDATE price_history SET open = ?, close = ?, high = ?, low = ? WHERE stockId = ? AND registrationNumber = ? AND timestamp = ?', [open, close, high, low, stockId, registrationNumber, timestamp]);
        } else {
            await db.query('UPDATE price_history SET open = ?, close = ?, high = ?, low = ? WHERE stockId = ?', [open, close, high, low, stockId]);
        }
        res.redirect('/Admin/Price-Monitoring');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// PRICE HISTORY: delete by registrationNumber
exports.deletePriceRecord = async (req, res) => {
    const registrationNumber = req.params.registrationNumber;
    try {
        await db.query('DELETE FROM price_history WHERE registrationNumber = ?', [registrationNumber]);
        res.redirect('/Admin/Price-Monitoring');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};


exports.TradeManagement=(req, res , next ) => {
    (async () => {
        try {
            const [rows] = await db.query('SELECT tradeId, buyerId, sellerId, amount, date, assetType, status FROM trade ORDER BY date DESC');
            res.render('store/Admin-ejs/Admin-TradeManagement', {
                pageTitle: 'Admin',
                currentPage: 'Trade-Management',
                Trades: rows
            });
        } catch (err) {
            console.error(err);
            res.send('Database Error');
        }
    })();
}

// TRADES: search by tradeId
exports.searchTrades = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [rows] = await db.query('SELECT tradeId, buyerId, sellerId, amount, date, assetType, status FROM trade WHERE tradeId LIKE ? ORDER BY date DESC', [`%${query}%`]);
        res.render('store/Admin-ejs/Admin-TradeManagement', {
            pageTitle: 'Admin',
            currentPage: 'Trade-Management',
            Trades: rows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// TRADES: add
exports.addTrade = async (req, res) => {
    const { buyerId, sellerId, amount, date, assetType, status } = req.body;
    try {
        await db.query('INSERT INTO trade (buyerId, sellerId, amount, date, assetType, status) VALUES (?, ?, ?, ?, ?, ?)', [buyerId, sellerId, amount, date, assetType, status]);
        res.redirect('/Admin/Trade-Management');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// TRADES: edit (tradeId readonly)
exports.editTrade = async (req, res) => {
    const tradeId = req.params.tradeId;
    const { buyerId, sellerId, amount, date, assetType, status } = req.body;
    try {
        await db.query('UPDATE trade SET buyerId = ?, sellerId = ?, amount = ?, date = ?, assetType = ?, status = ? WHERE tradeId = ?', [buyerId, sellerId, amount, date, assetType, status, tradeId]);
        res.redirect('/Admin/Trade-Management');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// TRADES: delete by tradeId
exports.deleteTrade = async (req, res) => {
    const tradeId = req.params.tradeId;
    try {
        await db.query('DELETE FROM trade WHERE tradeId = ?', [tradeId]);
        res.redirect('/Admin/Trade-Management');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};

exports.AIBasedFraudDetection=(req, res , next ) => {
    // fetch fraud alerts from `fraud` table
    (async () => {
        try {
            const [rows] = await db.query('SELECT alertId, riskScore, detectionDate, transactionId FROM fraud ORDER BY detectionDate DESC');
            res.render('store/Admin-ejs/Admin-FruadDetect', {
                pageTitle: 'Admin',
                currentPage: 'AI-Based-Fraud-Detection',
                FraudList: rows
            });
        } catch (err) {
            console.error(err);
            res.send('Database Error');
        }
    })();
}

// FRAUD: search by alertId
exports.searchFraud = async (req, res) => {
    const query = req.query.query || '';
    try {
        const [rows] = await db.query('SELECT alertId, riskScore, detectionDate, transactionId FROM fraud WHERE alertId LIKE ? ORDER BY detectionDate DESC', [`%${query}%`]);
        res.render('store/Admin-ejs/Admin-FruadDetect', {
            pageTitle: 'Admin',
            currentPage: 'AI-Based-Fraud-Detection',
            FraudList: rows
        });
    } catch (err) {
        console.error(err);
        res.send('Search Error');
    }
};

// FRAUD: add
exports.addFraud = async (req, res) => {
    const { riskScore, detectionDate, transactionId } = req.body;
    try {
        await db.query('INSERT INTO fraud (riskScore, detectionDate, transactionId) VALUES (?, ?, ?)', [riskScore, detectionDate, transactionId]);
        res.redirect('/Admin/AI-Based-Fraud-Detection');
    } catch (err) {
        console.error(err);
        res.send('Insert Error');
    }
};

// FRAUD: edit (alertId readonly)
exports.editFraud = async (req, res) => {
    const alertId = req.params.alertId;
    const { riskScore, detectionDate, transactionId } = req.body;
    try {
        await db.query('UPDATE fraud SET riskScore = ?, detectionDate = ?, transactionId = ? WHERE alertId = ?', [riskScore, detectionDate, transactionId, alertId]);
        res.redirect('/Admin/AI-Based-Fraud-Detection');
    } catch (err) {
        console.error(err);
        res.send('Update Error');
    }
};

// FRAUD: delete by alertId
exports.deleteFraud = async (req, res) => {
    const alertId = req.params.alertId;
    try {
        await db.query('DELETE FROM fraud WHERE alertId = ?', [alertId]);
        res.redirect('/Admin/AI-Based-Fraud-Detection');
    } catch (err) {
        console.error(err);
        res.send('Delete Error');
    }
};

exports.PredictionStockPricet = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM prediction");

        res.render('store/Admin-ejs/Admin-PricePrediction', {
            pageTitle: 'Admin',
            currentPage: 'Prediction-of-Stock-Price',
            PredictionList: rows
        });

    } catch (err) {
        console.error(err);
        res.send("Database Error");
    }
};

// SEARCH
exports.searchPredictions = async (req, res) => {
    const query = req.query.query;

    try {
        const [rows] = await db.query(
            "SELECT * FROM prediction WHERE stockId LIKE ?", [`%${query}%`]
        );

        res.render('store/Admin-ejs/Admin-PricePrediction', {
            pageTitle: 'Admin',
            currentPage: 'Prediction-of-Stock-Price',
            PredictionList: rows
        });

    } catch (err) {
        console.error(err);
        res.send("Search Error");
    }
};

// ADD
exports.addPrediction = async (req, res) => {
    const { registrationNumber, stockId, timestamp, predictedPrice, modelName, date, accuracyScore } = req.body;

    try {
        await db.query(
            `INSERT INTO prediction (registrationNumber, stockId, timestamp, predictedPrice, modelName, date, accuracyScore) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [registrationNumber, stockId, timestamp, predictedPrice, modelName, date, accuracyScore]
        );

        res.redirect('/Admin/Prediction-of-Stock-Price');

    } catch (err) {
        console.error(err);
        res.send("Insert Error");
    }
};

// EDIT
exports.editPrediction = async (req, res) => {
    const stockIdParam = req.params.stockId;
    const { registrationNumber, timestamp, predictedPrice, modelName, date, accuracyScore } = req.body;

    try {
        // If registrationNumber provided, include in WHERE to be safer
        if (registrationNumber) {
            await db.query(
                `UPDATE prediction SET predictedPrice=?, modelName=?, date=?, accuracyScore=? WHERE stockId=? AND registrationNumber=?`,
                [predictedPrice, modelName, date, accuracyScore, stockIdParam, registrationNumber]
            );
        } else {
            await db.query(
                `UPDATE prediction SET predictedPrice=?, modelName=?, date=?, accuracyScore=? WHERE stockId=?`,
                [predictedPrice, modelName, date, accuracyScore, stockIdParam]
            );
        }

        res.redirect('/Admin/Prediction-of-Stock-Price');

    } catch (err) {
        console.error(err);
        res.send("Update Error");
    }
};


// DELETE
exports.deletePrediction = async (req, res) => {
    const stockId = req.params.stockId;

    try {
        await db.query("DELETE FROM prediction WHERE stockId = ?", [stockId]);

        res.redirect('/Admin/Prediction-of-Stock-Price');

    } catch (err) {
        console.error(err);
        res.send("Delete Error");
    }
};

exports.Userdetails=(req, res , next ) => {
   
    res.render('store/Admin-ejs/Admin-UserDetail', {
    pageTitle: 'Admin',
    currentPage : 'User-details',
   InvestorList : [],
   TransactionList:[],
   StakeholderList: []
  });
}

