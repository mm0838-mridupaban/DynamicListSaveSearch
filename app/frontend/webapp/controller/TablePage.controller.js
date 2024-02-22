sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, ODataModel, Column, ColumnListItem, Text) {
    "use strict";

    return Controller.extend("frontend.controller.TablePage", {
      onInit: function () {
        this.gettingData();
      },

      gettingData: function () {
        // var sUrl = this.getOwnerComponent().getModel("mainModel").getServiceUrl() + "Employees"
        var sUrl =
          "https://services.odata.org/v4/northwind/northwind.svc/Employees";
        var that = this;
        //Make a Call using AJAX

        $.ajax({
          type: "GET",
          url: sUrl,
          success: function (data) {
            console.log("data", data.value);
            var oModel = that.getView().getModel("tableDataModel");
            oModel.setProperty("/Datas", data.value);
          },
          error: function () {
            console.log(error);
          },
        });
      },

      creatingTable: function () {
        var oModel1 = this.getView().getModel("tableDataModel");
        var newEmployee = oModel1.getProperty("/Datas");
        console.log("newEmployee", newEmployee);

        var columnNames = Object.keys(newEmployee[0]);


        // Create a new instance of sap.m.Table
        var oTable = new sap.m.Table({
          growing: true,
          growingScrollToLoad: true,
          inset:false
        });

        // Create columns dynamically
        Object.keys(newEmployee[0]).forEach(function (columnName) {
          // console.log('columnName',columnName) here column name is working fine representing column
          oTable.addColumn(
            new sap.m.Column({
              header: new sap.m.Label({ text: columnName }),
              width: "auto", // Set width to auto for responsive behavior
            })
          );
        });

        // Bind items to the table
        var oItemTemplate = new sap.m.ColumnListItem();
        Object.keys(newEmployee[0]).forEach(function(columnName) {
            oItemTemplate.addCell(new sap.m.Text({ text: "{" + columnName + "}" }));
        });
        // console.log('oItemTemplate',oItemTemplate)

        // // Add cells for each column
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Address}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{BirthDate}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{City}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Country}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{EmployeeID}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Extension}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{FirstName}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{HireDate}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{HomePhone}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{LastName}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Notes}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Photo}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{PhotoPath}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{PostalCode}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Region}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{ReportsTo}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{Title}" }));
        // oItemTemplate.addCell(new sap.m.Text({ text: "{TitleOfCourtesy}" }));

        // oTable.bindAggregation("items", {
        //   path: "tableDataModel>/Datas",
        //   template: oItemTemplate,
        // });

        oTable.bindItems({
          path: "tableDataModel>/Datas",
          template: new sap.m.ColumnListItem({
            cells: columnNames.map(function(columnName) {
              return new sap.m.Text({
                text: "{tableDataModel>" + columnName + "}"
              });
            })
          })
        });



        // oTable.bindItems({
        //   path: "tableDataModel>/Datas",
        //   template: new sap.m.ColumnListItem({
        //     cells:[

        //       new sap.m.Text({
        //         text:"{tableDataModel>EmployeeID}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>LastName}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>FirstName}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>Title}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>TitleOfCourtesy}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>BirthDate}"
        //       }),
        //       new sap.m.Text({
        //       text:"{tableDataModel>HireDate}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>Address}"
        //       }),
        //       new sap.m.Text({
        //         text:"{tableDataModel>City}"
        //       }),
        //     ]
        //   })
        // })







        oTable.attachEvent("dataReceived", function (event) {
          if (event.getParameter("error")) {
            console.error(
              "Error occurred during data binding:",
              event.getParameter("error")
            );
          }
        });

        // Append the table to the content box
        var contentBox = this.byId("contentBox");
        contentBox.addItem(oTable);
      },

      creatingTable1: function () {
        var oModel1 = this.getView().getModel("tableDataModel");
        var newEmployee = oModel1.getProperty("/Datas");
        var totalRowCounts = Object.keys(newEmployee[0]).length;

        var contentBox = this.byId("contentBox");
        // var contentBox = this.byId("idMyTable");

        var columnNames = Object.keys(newEmployee[0]);

        const columnData = Object.keys(newEmployee[0]).map((key) => ({
          columnName: key,
        }));

        var oTable = new sap.ui.table.Table({
          visibleRowCount: totalRowCounts,
        });

        var oModel = new sap.ui.model.json.JSONModel();

        oModel.setData({
          rows: newEmployee,
          columns: columnData,
        });

        oTable.setModel(oModel);

        oTable.bindColumns("/columns", function (sId, oContext) {
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
      },
    });
  }
);

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
