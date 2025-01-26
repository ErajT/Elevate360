const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { checkToken } = require("./auth/token_validation")


const EmployeeRouter = require('./Routers/EmployeeRoutes');
const AdminRouter = require('./Routers/AdminRouter');
const baRouter = require('./Routers/BARouter');
const clientRouter = require('./Routers/ClientRouter');
const pmRouter = require('./Routers/PMRoutes');

let app = express();
app.options('*', cors()); // Allow preflight requests

// Middleware to enable CORS
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://learn-lime-three.vercel.app'); // Adjust the origin as needed
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  next();
});

app.use(cors({
  origin: ['http://localhost:5173', 'https://learn-lime-three.vercel.app'], // Allow requests from frontend application
  // origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // Allow credentials (cookies) to be included with requests
}));

app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));


const corsOptions = {
  origin: ['http://localhost:5173', 'https://learn-lime-three.vercel.app'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
  credentials: true // Allow credentials
};

//middleware for request body
app.use(express.json());
app.use('/employee', EmployeeRouter);
app.use('/admin', AdminRouter);
app.use('/client', clientRouter);
app.use('/ba', baRouter);
app.use('/pm', pmRouter);

app.listen(2000,()=>{
  console.log("Server has started");
})
