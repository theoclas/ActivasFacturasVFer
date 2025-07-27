const express = require('express');

const facturas = require ('./Facturas.routes');

function routerApi(app){
    const router = express.Router();
    app.use('/API', router);
    router.use('/facturas',facturas)
}


module.exports = routerApi;
