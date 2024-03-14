// const cds = require('@sap/cds');
// const db = cds.connect.to('db');

module.exports = (srv) => {

  srv.on("TestAc", (req, res) => {
    console.log(req);

    return "Successfull custom Actions";
  });
};
