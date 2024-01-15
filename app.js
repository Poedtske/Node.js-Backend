const express= require('express');
// const chalk=require('chalk');
const debug= require('debug')('app');
const morgan=require('morgan');
const path=require('path');
const mysql=require('mysql');

const methodOverride=require('method-override');

// const con=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
// })

const PORT= process.env.PORT || 3000;
const app=express();
const sessionsRouter=require('./src/routers/sessionsRouters');
const adminRouter=require('./src/routers/adminRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));

app.set('views','./src/views');
app.set('view engine','ejs');

app.use('/sessions',sessionsRouter);
app.use('/admin',adminRouter);

app.get('/',(req,res)=>{
    res.render('index',{title:'Welcome to Globomantics', data:['a','b','c']});
})




app.listen(PORT,()=>{
    debug('listening to port ' + PORT);
});