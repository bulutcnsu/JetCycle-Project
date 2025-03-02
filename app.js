const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static( 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/public/'
}));

globalThis.UserIN = null;

app.use(
  session({
    secret: 'my_keyboard_cat', 
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/jetcycle-db' })
    })
);
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use('*', (req, res, next) => {
   next();    
   });


app.use('/', pageRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);


     mongoose.connect('mongodb://localhost/jetcycle-db')
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err));

    const PORT =  3000 || process.env.PORT  ;

    app.listen(PORT, function () {
    console.log("Server is running on port 3000 ")
  });