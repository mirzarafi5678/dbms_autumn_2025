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


