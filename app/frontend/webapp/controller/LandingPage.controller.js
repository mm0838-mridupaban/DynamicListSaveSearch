sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("frontend.controller.LandingPage", {
      onInit: function () {
        console.log("Landing Page");
      },
      onSelect: function (oEvent) {
        // Get the selected column item
        var oSelectedItem = oEvent.getSource();

        // Access the details of the selected column
        var oColumnData = oSelectedItem
          .getBindingContext("mainModel")
          .getObject();

        // Handle the column details as needed
        let table_id = oColumnData.table_id;
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("TablePage", { table_id: table_id });
      },
      // --------------------------Opening and closing the Create List Fragment-------------------->

      onOpenDialog: function () {
        // create dialog lazily
        this.pDialog ??= this.loadFragment({
          name: "frontend.view.AddTable",
        });
        this.pDialog.then((oDialog) => {
          oDialog.open();
        });
      },

      onCancelDialog: function () {
        this.getView().byId("OpenDialog").close();
      },

      // -------------------OnClickCreate--------------------------------------->>>>

      onClickCreate: async function () {
        let oModel = this.getView().getModel("tableDataModel");
        let newTable = oModel.getProperty("/NewTable");
        let entity = newTable.entitySelected;
        let table_id = newTable.table_id;
        let localUrl = this.getOwnerComponent()
          .getModel("mainModel")
          .getServiceUrl();

        console.log("entity", entity, "table_id", table_id);

        await this.creatingTableList(newTable);
        let columnNames = await this.gettingNorthWindData(entity);
        let lastIdNumber = await this.getLastColumnId();
        console.log("columnNamesuuu", columnNames);
        // let columnId=await this.getColumnId();
        this.createColumnSettings(
          localUrl,
          table_id,
          lastIdNumber,
          columnNames
        );
        // let {entity,table_Id}= await this.creatingTableList();
        // console.log('lastColumnIdzzz',lastColumnId)
        // createTableSettings(lastColumnId,table_Id,columnNames)
      },

      // --------------------Creating Table List------------------------------------>>>

      creatingTableList: async function (localUrl, newTable) {
        let sUrl = localUrl + "TablesList";
        var that = this;

        // Sending data to backend-------------------------
        $.ajax({
          headers: {
            "X-Requested-With": "XMLHttpsRequest",
          },
          type: "POST",
          url: sUrl,
          contentType: "application/json",
          data: JSON.stringify(newTable),
          success: function (data) {
            // Handle successful response
            console.log("Data posted successfully:", data);
            that.onCancelDialog();
            // that.allEmployeeDetails();
          },
          error: function (xhr, status, error) {
            // Handle errors
            MessageBox.error(`${xhr.status} ${xhr.statusText}`);
            console.error(
              "Error posting data:",
              xhr.status,
              xhr.statusText,
              status
            );
            if (xhr.responseJSON && xhr.responseJSON.message) {
              console.error("Error message:", xhr.responseJSON.message);
            } else {
              console.error("Error details:", error);
            }
          },
        });
      },

      // ----------------------------Getting Columns Names for selected entity from Northwind---------->>

      // gettingNorthWindData: function (entityName) {
      //     let sUrl = `https://services.odata.org/v4/northwind/northwind.svc/${entityName}`;
      //     var that = this;
      //     //Make a Call using AJAX
      //     $.ajax({
      //       type: "GET",
      //       url: sUrl,
      //       success: function (data) {
      //         let oModel = that.getView().getModel("tableDataModel");
      //         var columnNames = Object.keys(data.value[0]);
      //         console.log('columnNames',columnNames)
      //         // return columnNames;
      //         resolve(columnNames);
      //         // oModel.setProperty("/Datas", data.value);
      //         // that.creatingTable();
      //       },
      //       error: function () {
      //         console.error(error);
      //       },
      //     });
      //   },

      gettingNorthWindData: async function (entityName) {
        return new Promise((resolve, reject) => {
          let sUrl = `https://services.odata.org/v4/northwind/northwind.svc/${entityName}`;
          var that = this;
          //Make a Call using AJAX
          $.ajax({
            type: "GET",
            url: sUrl,
            success: function (data) {
              var columnNames = Object.keys(data.value[0]);
              // console.log("columnNames", columnNames);
              resolve(columnNames);
            },
            error: function (error) {
              console.error(error);
              reject(error);
            },
          });
        });
      },

      // -------Get last columnId from columnSettings Table-------------->>

      getLastColumnId: function (localUrl) {
        return new Promise((resolve, reject) => {
          let sUrl =
          localUrl +
            "ColumnSettings";
          $.ajax({
            type: "GET",
            url: `${sUrl}?$orderby=column_id desc&$top=1`,
            success: function (data) {
              let lastId = data.value[0].column_id; // Assuming the response contains an array with a single object
              let lastIdNumber = parseInt(lastId.split("_").pop()); // Extract the last ID number
              console.log("lastIdNumber", typeof lastIdNumber);
              resolve(lastIdNumber);
            },
          });
        });
      },

      // ---------------------------------------Creating and Sending data to ColumnSettings table---->>>
      createColumnSettings: function (
        localUrl,
        tableId,
        lastIdNumber,
        columnNames
      ) {
        let sUrl = localUrl + "ColumnSettings";
        // Loop through each column name and create a new entry in the ColumnSettings entity
        columnNames.forEach((columnName, index) => {
          let is_visible = index === 0; // Set is_visible to true only for the first column
          let columnId = "" + (lastIdNumber + index + 1);

          let newColumnSetting = {
            column_id: columnId,
            table_id: tableId,
            column_name: columnName,
            display_order: index, // Assuming display order starts from 0
            is_visible: is_visible,
            // If the column_id is auto-generated, you don't need to provide it here
          };
          console.log("newColumnSetting", newColumnSetting);

          // Make a POST request to your OData service to create a new entry in the ColumnSettings entity
          // Example using jQuery.ajax():
          $.ajax({
            type: "POST",
            url: sUrl, // Adjust the URL as per your service endpoint
            contentType: "application/json",
            data: JSON.stringify(newColumnSetting),
            success: function (response) {
              console.log("New column setting created:", response);
            },
            error: function (error) {
              console.error("Error creating column setting:", error);
            },
          });
        });
      },
    });
  }
);
