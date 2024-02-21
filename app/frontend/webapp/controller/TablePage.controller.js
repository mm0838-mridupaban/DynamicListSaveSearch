sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, ODataModel, Column, ColumnListItem, Text) {
        "use strict";

        return Controller.extend("frontend.controller.TablePage", {
            onInit: function () {
                this.gettingData()

            },

            // gettingData: async function () {
            //     try {
            //         // Use Axios to fetch data from an API
            //         const response = await axios.get('https://services.odata.org/v4/northwind/northwind.svc/Employees');

            //         // Handle successful response
            //         console.log(response.data);
            //     } catch (error) {
            //         // Handle error
            //         console.error(error);
            //     }
            // }

            gettingData: function () {
                // var sUrl = this.getOwnerComponent().getModel("mainModel").getServiceUrl() + "Employees"
                var sUrl = "https://services.odata.org/v4/northwind/northwind.svc/Employees"
                var that = this;
                //Make a Call using AJAX

                $.ajax({
                    type: "GET",
                    url: sUrl,
                    success: function (data) {
                        console.log("data", data.value)
                        var oModel = that.getView().getModel("tableDataModel");
                        oModel.setProperty("/Datas", data.value)
                    },
                    error: function () {
                        console.log(error)
                    }
                });
            },

            // simply:function(){
            //     let oModel = this.getView().getModel("tableDataModel");
            //     let newEmployee = oModel.getProperty("/Datas");
            //     console.log("newEmployee",newEmployee);
            //     var data = [
            //         { property1: "Value 1", property2: "Value 2", property3: "Value 3" },
            //         { property1: "Value 4", property2: "Value 5", property3: "Value 6" },
            //         // Add more data objects as needed
            //     ];
            //     data.map((prod)=>{
            //         console.log(prod.property1)
            //     })
            // },

            // settingTable:function(){

            //      // Sample data array
            // var data = [
            //     { property1: "Value 1", property2: "Value 2", property3: "Value 3" },
            //     { property1: "Value 4", property2: "Value 5", property3: "Value 6" },
            //     // Add more data objects as needed
            // ];
            // data.map((prod)=>{
            //     console.log(prod.property1)
            // })

            // // Create a JSON model and set data
            // var oModel = new sap.ui.model.json.JSONModel();
            // oModel.setData(data);

            // // Set the model to the view
            // this.getView().setModel(oModel, "yourModel");

            // // Dynamically add columns to the table
            // var oView = this.getView();
            // var oTable = oView.byId("dynamicTable");

            // data[0] && Object.keys(data[0]).forEach(function (sKey) {
            //     var oColumn = new sap.m.Column({
            //         header: new sap.m.Text({ text: sKey })
            //     });
            //     oTable.addColumn(oColumn);
            // });

            // // Dynamically add cells to the table
            // var oFragmentCell;
            // data[0] && Object.keys(data[0]).forEach(function (sKey) {
            //     oFragmentCell = sap.ui.xmlfragment(oView.getId(), "yourFragmentCell", this);
            //     oFragmentCell.bindProperty("text", sKey);
            //     oTable.bindAggregation("items", "yourModel>/", function () {
            //         return sap.ui.xmlfragment(oView.getId(), "yourFragmentCell", this);
            //     });
            // });

            // }



            // creatingTable: function () {
            //     let oModel = this.getView().getModel("tableDataModel");
            //     let newEmployee = oModel.getProperty("/Datas");
            //     const length = Object.keys(newEmployee[0]).length;
            //     let columnNames = Object.keys(newEmployee[0])



            //     var oTable = this.getView().byId("idMyTable");

            //     for (let i = 0; i < length; i++) {
            //         var oColumn = new sap.m.Column("col" + i, {
            //             width: "1em",
            //             header: new sap.m.Label({
            //                 text: columnNames[i]
            //             })
            //         });
            //         oTable.addColumn(oColumn);
            //     }

            //     var oCell = [];
            //     for (var i = 0; i < length; i++) {
            //         // if (i === 0) {
            //         //     var cell1 = new sap.m.Text({
            //         //         text: "{QuestionTx}"
            //         //     });
            //         // }
            //         var cell1 = new sap.m.Text({
            //             text: "datasss"
            //         });
            //         oCell.push(cell1);
            //     }
            //     console.log('ocell',oCell)
            //     var aColList = new sap.m.ColumnListItem("aColList", {
            //         cells: oCell
            //      });

            //     //  oTable.bindItems("<entityset>", aColList);
            //      oTable.bindItems("/Datas", aColList);



            // },



        creatingTable: function () {
            var oModel = this.getView().getModel("tableDataModel");
            var newEmployee = oModel.getProperty("/Datas");
            console.log()
            var length = Object.keys(newEmployee[0]).length;
            var columnNames = Object.keys(newEmployee[0]);
            const values = Object.values(newEmployee);
            // console.log('values',values)


            var oTable = this.getView().byId("idMyTable");

            for (var i = 0; i < length; i++) {
                var oColumn = new Column({
                    width: "1em",
                    header: new sap.m.Label({
                        text: columnNames[i]
                    })
                });
                oTable.addColumn(oColumn);
            }

            var oCell = [];
            for (var i = 0; i < length; i++) {
                var cell = new Text({
                    // text: "{" + columnNames[i] + "}"
                    text: "Datasss"
                });
                console.log("cellcccc",cell)
                oCell.push(cell);
            }

            var aColList = new sap.m.ColumnListItem("aColList", {
         cells: oCell
      });
            console.log('oColListItem',aColList)
            oTable.bindItems("/tableDataModel/Datas", aColList);
        }



        });
    });



// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/odata/v2/ODataModel",
//     "sap/m/Column",
//     "sap/m/ColumnListItem",
//     "sap/m/Text"
// ], function (Controller, ODataModel, Column, ColumnListItem, Text) {
//     "use strict";

//     return Controller.extend("frontend.controller.TablePage", {
//         onInit: function () {
//             this.gettingData();
//         },

//         // gettingData: function () {
//         //     var sUrl = "https://services.odata.org/V2/Northwind/Northwind.svc/";
//         //     var oModel = new ODataModel(sUrl);
//         //     var that = this;
            
//         //     oModel.read("/Employees", {
//         //         success: function (oData) {
//         //             console.log("data", oData.results);
//         //             var oModel = that.getView().getModel("tableDataModel");
//         //             oModel.setProperty("/Datas", oData.results);
//         //         },
//         //         error: function (error) {
//         //             console.error("Error fetching data:", error);
//         //         }
//         //     });
//         // },
//                     gettingData: function () {
//                 // var sUrl = this.getOwnerComponent().getModel("mainModel").getServiceUrl() + "Employees"
//                 var sUrl = "https://services.odata.org/v4/northwind/northwind.svc/Employees"
//                 var that = this;
//                 //Make a Call using AJAX

//                 $.ajax({
//                     type: "GET",
//                     url: sUrl,
//                     success: function (data) {
//                         console.log("data", data.value)
//                         var oModel = that.getView().getModel("tableDataModel");
//                         oModel.setProperty("/Datas", data.value)
//                     },
//                     error: function () {
//                         console.log(error)
//                     }
//                 });
//             },


//         creatingTable: function () {
//             var oModel = this.getView().getModel("tableDataModel");
//             var newEmployee = oModel.getProperty("/Datas");
//             var length = Object.keys(newEmployee[0]).length;
//             var columnNames = Object.keys(newEmployee[0]);

//             // let oModel = this.getView().getModel("tableDataModel");
//             //                 let newEmployee = oModel.getProperty("/Datas");
//             //                 const length = Object.keys(newEmployee[0]).length;
//             //                 let columnNames = Object.keys(newEmployee[0])

//             var oTable = this.getView().byId("idMyTable");

//             for (var i = 0; i < length; i++) {
//                 var oColumn = new Column({
//                     width: "1em",
//                     header: new sap.m.Label({
//                         text: columnNames[i]
//                     })
//                 });
//                 oTable.addColumn(oColumn);
//             }

//             var oCell = [];
//             for (var i = 0; i < length; i++) {
//                 var cell = new Text({
//                     text: "{" + columnNames[i] + "}"
//                 });
//                 console.log("cellcccc",cell)
//                 oCell.push(cell);
//             }

//             var oColListItem = new ColumnListItem({
//                 cells: oCell
//             });

//             oTable.bindItems("/Datas", oColListItem);
//         }
//     });
// });
