module.exports = (srv) => {

    // Reply mock data for Books...
    srv.after ('READ', 'TablesList', (req,res)=>{
        let lenRes=res.results.length;
        for (let i=0;i<lenRes;i++){
            if(i===1 || i===2){
                res.results[i].description="From Nodejs";
            }
        }      
});
srv.before ('CREATE', 'TablesList', (req,res)=>{
    console.log("req.body",req)
    // let lenRes=res.results.length;
    // for (let i=0;i<lenRes;i++){
    //     if(i===1 || i===2){
    //         res.results[i].description="From Nodejs";
    //     }
    })


}
   
    // Reply mock data for Authors...
    // srv.on ('READ', 'Authors', ()=>[
    //   { ID:101, name:'Emily Brontë' },
    //   { ID:150, name:'Edgar Allen Poe' },
    //   { ID:170, name:'Richard Carpenter' },
    // ])
   
   

// const express = require('express');
// const tablesListRouter = require('./routes/tablesListRoutes');

// const app = express();

// app.use(express.json());

// // Mount the routes
// app.use('/api/tablesList', tablesListRouter);

// // Other middleware and configurations...

// module.exports = app;


// const cds = require, '@sap/cds', 
// const {Students} = cds.entities, 
// const db = cds.connect.to, 'db', 
// module.exports = cds.service.impl, srv => {
//      //  srv.before, 'READ', 'Students', capitalizename, 'Order_Items', capitalizeitem, }, 
//      async function capitalizename, 
//      req, let db_data = 
//      console.log, content"SELECT * " +, "FROM MY_PRACTISE_STUDENTS as header " +, "WHERE header.ID = '" + 1 + "'", let content = await cds.run, db_data, 