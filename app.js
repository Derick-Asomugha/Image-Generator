import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
 

app.get('/', (req, res) => {
  const routeSelect = req.query.routeSelect;

  const routesMap = {
    '/phanes': 'phanes',
    '/bullx': 'bullx',
    '/fpmp': 'fpmp',
    '/axiom': 'axiom',
    '/blueray': 'blueray'
  };
  let generator = routesMap[routeSelect]
  if (routeSelect && routesMap[routeSelect]) {
    
    res.render(generator);
  } else {
    res.render('home');
  }
});


app.post('/axiom', (req, res) => {

  const { pnlInSol, pnl, buyingPrice, currentPrice } = req.body;

  res.render('axiom-generator', {
    pnlInSol,
    pnl,
    buyingPrice,
    currentPrice
  });
});

app.post('/blueray', (req, res) => {

  const { pnl, entryprice, currentPrice } = req.body;

  res.render('blueray-generator', {
    pnl,
    entryprice,
    currentPrice
  });
});


app.post('/bullx', (req, res) => {

  const { pnl, totalinvested, totalsold, totalprofit } = req.body;

  res.render('bullx-generator', {
    pnl,
    totalinvested,
    totalsold,
    totalprofit
  });
});


app.post('/fpmp', (req, res) => {

  const { investment, currentProfit, investmentInUsd, currentProfitInUsd, pnl } = req.body;

  res.render('fpmp-generator', {
    investment,
    currentProfit,
    investmentInUsd,
    currentProfitInUsd,
    pnl
  });
});


app.post('/phanes', (req, res) => {

  const { tkName, marketValue, pnl, name, duration } = req.body;

  res.render('phanes-generator', {
    tkName,
    marketValue,
    pnl,
    name,
    duration
  });
});







app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
