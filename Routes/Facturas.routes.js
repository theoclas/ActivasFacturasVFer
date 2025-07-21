const Router = require('express').Router;
const FacturasServices = require ('../Services/Facturas.services');

const router = Router();
const servicioFacturas = new FacturasServices();

router.get('/BuscarFactura/:idempresaV/:nrofactura', async (req, res) =>{
    const idempresaV = req.params.idempresaV;
    const nrofactura = req.params.nrofactura;
    
    try {
        const resultados = await servicioFacturas.FindOne(idempresaV, nrofactura);
        if(resultados.length === 0){
            return res.status(404).json({mensaje: `Facturas numero ${nrofactura} No se encontro por ningun lado hermano`})
        }

        res.json(resultados);
    } catch (error) {
        console.error(`No pai ERROR EJECUANDO VEA >>>>> ${error}`);
        res.status(500).json({error: error.message})
        
    }

});


router.get('/Buscar/', async (req, res) =>{
    
    try {
        const resultados = await servicioFacturas.Find();
        if(resultados.length === 0){
            return res.status(404).json({mensaje: `Facturas numero ${nrofactura} No se encontro por ningun lado hermano`})
        }

        res.json(resultados);
    } catch (error) {
        console.error(`No pai ERROR EJECUANDO VEA >>>>> ${error}`);
        res.status(500).json({error: error.message})
        
    }

});

router.get('/', (req, res) => {
    res.status(200).json({mensaje: 'Esta funcionando'})
})
module.exports = router;

