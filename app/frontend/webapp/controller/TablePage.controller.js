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


        creatingTable: function () {
            var oModel1 = this.getView().getModel("tableDataModel");
            var newEmployee = oModel1.getProperty("/Datas");
            var totalRowCounts = Object.keys(newEmployee[0]).length;

            var contentBox = this.byId("contentBox");
            // var contentBox = this.byId("idMyTable");
       
            var columnNames = Object.keys(newEmployee[0]);

            const columnData = Object.keys(newEmployee[0]).map(key => ({ columnName: key }));

            var oTable = new sap.ui.table.Table({
                visibleRowCount: totalRowCounts
            });

            var oModel = new sap.ui.model.json.JSONModel();

            oModel.setData({
                rows: newEmployee,
                columns: columnData
            });

            oTable.setModel(oModel);

            oTable.bindColumns("/columns", function(sId, oContext) {
                var columnName = oContext.getObject().columnName;
                return new sap.ui.table.Column({
                    label: columnName,
                    template: columnName,
                });
            });
            oTable.bindRows("/rows");
            // oTable.placeAt("content");
             // Set table properties for responsiveness
            // oTable.setGrowing(true);
            // oTable.setGrowingScrollToLoad(true);

            //  // Adjust column sizing for responsiveness
            //  oTable.getColumns().forEach(function(column) {
            //      column.setMinScreenWidth("Tablet");
            //  });
            contentBox.addItem(oTable);







// -----------------------------------------------------1st trial strarts--------------------------------------

    //         var oTable = this.getView().byId("idMyTable");

    //         for (var i = 0; i < length; i++) {
    //             var oColumn = new Column({
    //                 width: "1em",
    //                 header: new sap.m.Label({
    //                     text: columnNames[i]
    //                 })
    //             });
    //             oTable.addColumn(oColumn);
    //         }

    //         var oCell = [];
    //         for (var i = 0; i < length; i++) {
    //             var cell = new Text({
    //                 // text: "{" + columnNames[i] + "}"
    //                 text: "Datasss"
    //             });
    //             oCell.push(cell);
    //         }

    //         var aColList = new sap.m.ColumnListItem("aColList", {
    //      cells: oCell
    //   });
    //         console.log('oColListItem',aColList)
    //         oTable.bindItems("/tableDataModel/Datas", aColList);

// -----------------------------------------------------1st trial ends--------------------------------------




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
