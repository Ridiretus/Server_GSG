const { Router } = require('express');
const router = Router();
const fs = require('fs');

class symbol{
    symbol;
    name;
    price;
}

class history{
    symbol;
    historical = [];
}

class stock{
    date;
    close;
}
//Raiz
router.get('/api/symbols/', (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    filePath = './src/symbols.json'  
    var data = JSON.parse(fs.readFileSync(filePath));
    let arraySymbol =[];
    data.symbolsList.forEach(element => {
        let newData = new symbol();
        newData.symbol = element.symbol;
        newData.name = element.name;
        newData.price = element.price;
        arraySymbol.push(newData);
    });
    res.json(
        {
            arraySymbol
        }
    );
})

router.get('/api/symbols/:symbol', (req, res) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    filePath = './src/symbols.json'  
    var data = JSON.parse(fs.readFileSync(filePath));
    let arraySymbol =[];
    data.symbolsList.forEach(element => {
        if (element.symbol == req.params.symbol) {
            let newData = new symbol();
            newData.symbol = element.symbol;
            newData.name = element.name;
            newData.price = element.price;
            arraySymbol.push(newData);
        }
    });
    res.json(
        {
            arraySymbol
        }
    );
})

router.get('/api/historical', (req, res) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    filePath = './src/historical.json'  
    var data = JSON.parse(fs.readFileSync(filePath));
    let arrayHistory =[];
    data.historicalStockList.forEach(element => {
        let newData = new history();
        newData.symbol = element.symbol;
        element.historical.forEach(historyDates => {
            let newHistory = new stock();
            newHistory.date = historyDates.date;
            newHistory.close = historyDates.close;
            newData.historical.push(newHistory); 
        });
        arrayHistory.push(newData);
    });
    res.json(
        {
            arrayHistory
        }
    );
})

router.get('/api/historical/:symbol', (req, res) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);  
    filePath = './src/historical.json'  
    var data = JSON.parse(fs.readFileSync(filePath));
    let arrayHistory =[];
    data.historicalStockList.forEach(element => {
        if (element.symbol == req.params.symbol) {
            let newData = new history();
            newData.symbol = element.symbol;
            element.historical.forEach(historyDates => {
                let newHistory = new stock();
                newHistory.date = historyDates.date;
                newHistory.close = historyDates.close;
                newData.historical.push(newHistory); 
            });
            arrayHistory.push(newData);
        }
    });
    res.json(
        {
            arrayHistory
        }
    );
})
module.exports = router;