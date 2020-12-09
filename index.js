import express from "express";
import data from "./data/data.json"
const app = express();
const PORT = 3000;


app.use(express.static('public'));

//method to use json
//app.use(express.json());
app.use(express.urlencoded({extended:true}));

//to use proxies
app.set('trust proxy', 'loopback');

app.use('/images', express.static('images'));

app.get('/', (req, res) => {
    //get data first
    res.json(data);
});



app.post('/fitem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})





app.get('/item/:id', (req, res, next) => {
    //this is middleware that pulls data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    //middleware that uses request object
    console.log(`request from: ${req.originalUrl}`);
    console.log(`request type: ${req.method}`);
    //everything above send is middleware
    res.send(data[user]);
    next();
}, (req, res) => {
    console.log("data recieved?");
}
)
//chaining routes
app.route('/xitem')
    .post((req, res) => {
    res.send(`a POST request with route on port ${PORT}`)
    })
    .get((req, res) => {
        throw new Error();
        //res.send(`a get request`);
    });







app.get('/images', (req, res) => {
    res.download('images/rocket.jpg')
    //res.send(`a POST request with route on port ${PORT}`)
    // res.end();
    // res.redirect('https://www.linkedin.com')
})

//error handling function

app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send(`alert! ${err.stack}`);
})


app.listen(PORT, () => {
    console.log(`your server is running at ${PORT}`);
    //console.log(data);
});

//to debug code go package.json and enter set DEBUG=express:*  to scripts along with nodemon script followed by &

