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
      onInit: function (oEvent) {
        console.log("I am working")
        this.fnLoad();
      },

      onNavButtonPress: function (){
        window.history.go(-1);
      },


      fnLoad: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("TablePage")
          .attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched(oEvent) {
        console.log("I am working")
        let table_id = window.decodeURIComponent(
          oEvent.getParameter("arguments").table_id
        );
        this.gettingSingleData(table_id);
      },

      // ---------------Getting the specific row data from Table List by table_id---------->

      gettingSingleData: function (table_id) {
        sap.ui.core.BusyIndicator.show()

        let sUrl =
          this.getOwnerComponent().getModel("mainModel").getServiceUrl() +
          `TablesList/${table_id}`;
        var that = this;
        //Make a Call using AJAX

        $.ajax({
          type: "GET",
          url: sUrl,
          success: function (data) {
            let entitySelected = data.entitySelected;
            // let oModel = that.getView().getModel("tableDataModel");
            
            // oModel.setProperty("/Datas", 0);
            // oModel.setProperty("/OriginalEmployeeDetail", data);
            // console.log("inside gettingSingleData",that.getView().getModel("tableDataModel").getProperty("/Datas"))
            that.gettingData(entitySelected);
          },
          error: function () {
            console.error(error);
          },
        });
      },

      // ---------------Getting the data from Northwind as per entity selected---------->

      gettingData: function (entityName) {
        let sUrl = `https://services.odata.org/v4/northwind/northwind.svc/${entityName}`;
        var that = this;
        //Make a Call using AJAX
        // console.log("inside gettingData",that.getView().getModel("tableDataModel").getProperty("/Datas"))


        $.ajax({
          type: "GET",
          url: sUrl,
          success:  function (data) {
            let oModel = that.getView().getModel("tableDataModel");
            oModel.setProperty("/Datas", data.value);
            that.creatingTable();
          },
          error: function () {
            console.error(error);
          },
        });
      },

      // ----------------------------------Creating Columns and Rows with dynamic data for the Table----------------->>>

      creatingTable: function () {
        
        var oTable = this.getView().byId("idMyTable");
        // oTable.unbindRows();
        // oTable.getModel().refresh(true);
        oTable.destroyColumns();
        // debugger;

        let oModel1 = this.getView().getModel("tableDataModel");
        let newEmployee = oModel1.getProperty("/Datas");
        // console.log("newEmployee", newEmployee);
        var columnNames = Object.keys(newEmployee[0]);
        // console.log('columnNames',columnNames)


        // Create columns dynamically
        columnNames.forEach(function (columnName) {
          oTable.addColumn(
            new sap.m.Column({
              width: "10rem",
              header: new sap.m.Label({ text: columnName }),
              // width: "auto", // Set width to auto for responsive behavior
            })
          );
        });

        oTable.bindItems({
          path: "tableDataModel>/Datas",
          template: new sap.m.ColumnListItem({
            cells: columnNames.map(function (columnName) {
              return new sap.m.ExpandableText({
                text: "{tableDataModel>" + columnName + "}",
                overflowMode: sap.m.ExpandableTextOverflowMode.Popover,
              });
            }),
          }),
        });
        sap.ui.core.BusyIndicator.hide();
      },
    });
  }
);
