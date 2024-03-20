// const cds = require('@sap/cds');
// // const db = cds.connect.to('db');



// // module.exports = (srv) => {

// //   srv.on("TestAc", (req, res) => {
// //     console.log(req);

// //     return "Successfull custom Actions";
// //   });




// // async function deducctNumberFn (req){
// //     //   req.data.EmpName="Stranger Updated from Endpoint"
// //       // let db_data = "SELECT * " +
// //       // "FROM com_maven_demoTest_Employees as header" +
// //       // "WHERE header.EmpId = '" + req.data.EmpId  + "'";
    
// //       let test= await cds.run(req.query);
// //       let db_dataa = 
// //      "UPDATE my_bookshop_Departments SET StudentCode = 'FromActions' WHERE DepID = "+test[0].DepID ;
     
    
// //     let content = await cds.run(db_dataa);
// //     //    console.log(content);
// //     //    if(!content){
// //     //      req.error("Value already exists");
// //     //    }
// //     //    else{
// //     //      let val = req.data.EmpId ;
// //     //      req.data.EmpId  = String((parseInt(val)+1))
// //     //    }
// //     //   if(req.data.name==="Ramraj"){
// //     //         req.data.EmpName = (req.data.EmpName).toUpperCase();
// //     //     }
// //     //     else{
// //     //         req.error("402","This is custom text");
// //     //     }
// //   }
// // };

// async function Signup2(req,res){
//   console.log('req',req.data);
//   const userData = req.data;
//   // const sql = 'INSERT INTO Users (id, name, email, password) VALUES (?, ?, ?, ?)';
//   // const values = [uuid(), userData.name, userData.email, userData.password];
//   // const sql = `INSERT INTO DYNAMICLISTSAVESEARCH_USERS (id,name, email, password) VALUES ('777',${userData.name}, ${userData.email}, ${userData.password})`;
//   const sql = `INSERT INTO DYNAMICLISTSAVESEARCH_USERS (id,name, email, password) VALUES ('777','Abc', 'kkkk','lll')`;
//   // const sql = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
//   // const values = [userData.name, userData.email, userData.password];
// console.log('sqlQuery',sql)
//       // let content = await cds.run(sql);
//       // console.log('content',content)


// };

// module.exports = cds.service.impl(srv => {
//   // srv.on('deductNumber',deducctNumberFn);
//   // srv.before('TestAct',TestActBefore);
//   // srv.on('TestAct',TestAct);
//   // srv.after('TestAct',TestActAfter);   
//   srv.on('Signup',Signup2)
// });


const { v4: uuid } = require('uuid');
const cds = require('@sap/cds');

async function Signup2(req) {
  console.log('req', req.data);
  const { Users } = cds.entities; // Assuming Users entity is defined in your CDS model

  const userData = req.data;

  try {
    const newUser = await cds.transaction(req).run(
      INSERT.into(Users).entries({
        id: uuid(),
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
    );

    console.log('New user inserted:', newUser.results[0]);
    // Construct response object
    const response = {
      message: 'User signed up successfully'
    };

    // Return response object
    return response;
    // return { id: newUser.id }; // Return only the ID of the new user
  } catch (error) {
    console.error('Error inserting user:', error);
    throw new Error('Failed to insert user');
  }
};

// async function Signup2(req) {
//   console.log('req', req.data);
//   const { Users } = cds.entities; // Assuming Users entity is defined in your CDS model

//   const userData = req.data;

//   try {
//     const newUser = await cds.transaction(req).run(
//       INSERT.into(Users).entries({
//         id: uuid(),
//         name: userData.name,
//         email: userData.email,
//         password: userData.password
//       })
//     );

//     console.log('New user inserted:', newUser.results[0]);
//     // Construct response object
//     const response = {
//       message: 'User signed up successfully'
//     };

//     // Return response object
//     return response;
//     // return { id: newUser.id }; // Return only the ID of the new user
//   } catch (error) {
//     console.error('Error inserting user:', error);
//     throw new Error('Failed to insert user');
//   }
// }

async function LoginFn(req) {
  console.log('req', req.data);
  const { Users } = cds.entities; // Assuming Users entity is defined in your CDS model

  const { email, password } = req.data;

  try {
    // Query the database to find the user with the provided email and password
    const user = await cds.run(SELECT.from(Users).where({ email: email, password: password }));

    if (user.length === 0) {
      throw new Error('Invalid email or password');
    }

    // Construct response object with user data
    const userData = user[0];
    const response = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      message: 'Login successful'
    };

    // Return response object
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Failed to log in');
  }
}

module.exports = cds.service.impl(srv => {
  srv.on('Signup', Signup2);
  srv.on('Login', LoginFn);
});
