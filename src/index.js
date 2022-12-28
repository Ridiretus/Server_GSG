const express = require('express');
const app = express();
const morgan=require('morgan');

//Configuraciones
app.set('port', process.env.PORT || 9090);
app.set('json spaces', 2)

app.use(require('./routes/index'))

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});