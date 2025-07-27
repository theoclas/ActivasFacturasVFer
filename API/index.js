const  express = require('express');
const cors = require('cors');
const routerAPI = require('./Routes/Server');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co', 'http://localhost:3000'];
const options = {
    origin: (origin, callback) => {
        if(!origin || whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback( new Error('Nopermitido bro'));
        }
    }
}
app.use(cors(options));

app.get('/', (req , res) => {
    console.log("Si entre");
    
    res.send('Hola, el servidor si esta corriendo, entonces hagale mijo ')
});


routerAPI(app);

app.listen(port, () =>{
    console.log(`El puerto por el cual esta corriendo papi es el ${port} `);
    
})
