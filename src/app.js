const dotenv = require('dotenv')
      express = require("express")
      fs = require("fs")
      bodyParser = require('body-parser')
      path = require( 'path' );

dotenv.config({path: __dirname + '/../.env'});
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
    response.send(`Success ${response.statusCode}`);
})


const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on port ${port}...`))

