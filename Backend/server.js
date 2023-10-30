const app = require('express')();
const connectToMongo = require('./database/db');
const router = require('./routes/route')
const cors = require('cors');
const bodyparser = require('body-parser')

require('dotenv').config();
const PORT = 5001;

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// available routes
app.use('/',router)

connectToMongo().then(()=>{
try {
    app.listen(PORT,()=>{
        console.log(`Server listening on port http://localhost:${PORT}`);
    })
    
} catch ( error) {
    console.log("Cannot connect to the server")
}
}).catch( ( error )=>{
    console.log("Invalid database connection")
})
