sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/ViewSettingsItem",
    "sap/ui/core/CustomData",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/ViewSettingsFilterItem",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    Fragment,
    MessageToast,
    ViewSettingsItem,
    CustomData,
    Filter,
    FilterOperator,
    Sorter,
    ViewSettingsFilterItem
  ) {
    "use strict";

    return Controller.extend("frontend.controller.TablePage", {
      onInit: function (oEvent) {
        this.fnLoad();
        this._mDialogs = {};
      },

      onNavButtonPress: function () {
        window.history.go(-1);
      },

      fnLoad: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("TablePage")
          .attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched(oEvent) {
        let table_id = window.decodeURIComponent(
          oEvent.getParameter("arguments").table_id
        );
        this.gettingSingleData(table_id);
        this.gettingColumnNames(table_id);
      },

      // ---------------Getting the specific row data from Table List by table_id from Hana DB---------->

      gettingSingleData: function (table_id) {
        sap.ui.core.BusyIndicator.show();

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
            that.gettingData(entitySelected);
          },
          error: function () {
            console.error(error);
          },
        });
      },
      // ----------------Getting the column Names from ColumnSettings as per tableID----->>>

      gettingColumnNames: function (table_id) {
          let sUrl =
          this.getOwnerComponent().getModel("mainModel").getServiceUrl() +
          `ColumnSettings?$filter=table_id eq '${table_id}'`; // Filter data based on table_id


        var that = this;
        //Make a Call using AJAX

        $.ajax({
          type: "GET",
          url: sUrl,
          success: function (data) {
            if(data.value.length < 1){
             return console.log("No data exist for the provided tableID")
            }
            // console.log("dataColumnss",data.value)
            let oModel = that.getView().getModel("tableDataModel");
            oModel.setProperty("/ColumnSettingsDatas", data.value);
            // console.log('NorthWindData',data.value)
          },
          error: function () {
            console.error(error);
          },
        });
      },
// -------------------Filtering datas as per column_name visible status---->>>

filteringDatas:function(){
  let NorthWindDatas=this.getView().getModel("tableDataModel").getProperty("/Datas");
  let ColumnSettingsDatas=this.getView().getModel("tableDataModel").getProperty("/ColumnSettingsDatas");

  console.log('NorthWindDatas',NorthWindDatas);
  console.log('ColumnSettingsDatas',ColumnSettingsDatas);
  
//   // Filter ColumnSettingsData to get only visible columns
// let visibleColumns = ColumnSettingsDatas.filter(column => column.is_visible);
// console.log('visibleColumns',visibleColumns)

// // Form a new array with data from Datas based on visible columns
// let newDataArray = visibleColumns.map(column => {
//     let columnName = column.column_name;
//     return NorthWindDatas.map(data => data[columnName]);
// });

// console.log('newDataArray',newDataArray)
let visibleColumns = ColumnSettingsDatas.filter(column => column.is_visible);

// Form a new array with data from Datas based on visible columns
let newformedArray = NorthWindDatas.map(data => {
    let newObj = {};
    visibleColumns.forEach(column => {
        newObj[column.column_name] = data[column.column_name];
    });
    return newObj;
});
this.getView().getModel("tableDataModel").setProperty("/SelectedColumnDatas");
console.log(newformedArray);

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
          success: function (data) {
            let oModel = that.getView().getModel("tableDataModel");
            console.log('NorthWindData',data.value)
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
        let oTable = this.getView().byId("idMyTable");
        // oTable.unbindRows();
        // oTable.getModel().refresh(true);
        oTable.destroyColumns();
        // debugger;

        let oModel1 = this.getView().getModel("tableDataModel");
        let datas = oModel1.getProperty("/Datas");
        // console.log("datas", datas);
        var columnNames = Object.keys(datas[0]);
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

      // ----------------------------Settings Section---------------------->>
      // // View Setting Dialog opener
      // _openDialog: function (sName, sPage, fInit) {
      //   var oView = this.getView();

      //   // creates requested dialog if not yet created
      //   if (!this._mDialogs[sName]) {
      //     console.log("sName", sName);
      //     this._mDialogs[sName] = Fragment.load({
      //       id: oView.getId(),
      //       // name: "frontend.view" + sName,
      //       name: "frontend.view.Dialog",
      //       controller: this,
      //     }).then(function (oDialog) {
      //       oView.addDependent(oDialog);
      //       if (fInit) {
      //         fInit(oDialog);
      //       }
      //       return oDialog;
      //     });
      //   }
      //   this._mDialogs[sName].then(function (oDialog) {
      //     // opens the requested dialog
      //     oDialog.open(sPage);
      //   });
      // },

      // // Opens View Settings Dialog
      // handleOpenDialog: function () {
      //   this._openDialog("Dialog");
      // },

      // // shows selected filters
      // handleConfirm: function (oEvent) {
      //   if (oEvent.getParameters().filterString) {
      //     MessageToast.show(oEvent.getParameters().filterString);
      //   }
      // },

      // -------------------------------------Settings 2 option-------------------------------------------------

      // Opens View Settings Dialog on Filter page
      handleOpenDialogSort: function () {
        this._openDialog("MainFilter", "sort", this._presetSettingsItems);
      },
      // Opens View Settings Dialog on Filter page
      handleOpenDialogFilter: function () {
        this._openDialog("MainFilter", "filter", this._presetSettingsItems);
      },
      // Opens View Settings Dialog on Filter page
      handleOpenDialogGroup: function () {
        this._openDialog("MainFilter", "group", this._presetSettingsItems);
      },

      _openDialog: function (sName, sPage, fInit) {
        let oView = this.getView(),
          oThis = this;

        // creates requested dialog if not yet created
        if (!this._mDialogs[sName]) {
          this._mDialogs[sName] = Fragment.load({
            id: oView.getId(),
            name: "frontend.view." + sName,
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            if (fInit) {
              fInit(oDialog, oThis);
            }
            return oDialog;
          });
        }
        this._mDialogs[sName].then(function (oDialog) {
          oDialog.open(sPage); // opens the requested dialog page
        });
      },

      _presetSettingsItems: function (oDialog, oThis) {
        console.log('oThis',oThis);
        oThis._presetFiltersInit(oDialog, oThis);
        oThis._presetSortsInit(oDialog, oThis);
        oThis._presetGroupsInit(oDialog, oThis);
      },

      // -----sorting-----

      _presetSortsInit: function (oDialog, oThis) {
        let oDialogParent = oDialog.getParent(),
          oTable = oDialogParent.byId("idMyTable"),
          oColumns = oTable.getColumns();
        // console.log('oColumns',oColumns)
        // Loop every column of the table
        oColumns.forEach((column) => {
          // let columnId = column.getId().split("--")[2]; // Get column ID (JSON Property)
          let columnId = column.getAggregation("header").getProperty("text"); // Get column ID (JSON Property)
          // console.log('columnIdzzzz',columnId)
          oDialog.addSortItem(
            new ViewSettingsItem({
              // Convert column ID into ViewSettingsItem objects.
              key: columnId, // Key -> JSON Property
              text: column.getAggregation("header").getProperty("text"),
            })
          );
        });
      },
      // ------filtering

      _presetFiltersInit: function (oDialog, oThis) {
        let oDialogParent = oDialog.getParent(),
          oModelData = oDialogParent
            .getController()
            .getOwnerComponent()
            .getModel("tableDataModel")
            .getData(),
          oTable = oDialogParent.byId("idMyTable"),
          oColumns = oTable.getColumns();
        console.log("oColumns", oColumns);
        // console.log('oTable',oTable);
        console.log("oModelData", oModelData.Datas);

        // Loop every column of the table
        oColumns.forEach((column) => {
          // let columnId = column.getId().split("--")[2], // Get column ID (JSON Property)
          // let columnId = column.getId().substring(2), // Get column ID (JSON Property)
          let columnId = column.getAggregation("header").getProperty("text"), // Get column ID (JSON Property)
            oColumnItems = oModelData.Datas.map((oItem) => oItem[columnId]), // Use column ID as JSON property (Here's the magic !)
            // oColumnItems = oModelData.Datas.map(oItem =>console.log('oItem',oItem)), // Use column ID as JSON property (Here's the magic !)
            oUniqueItems = oColumnItems.filter(
              (value, index, array) => array.indexOf(value) === index
            ), // Get all unique values for this column
            oUniqueFilterItems = oUniqueItems.map(
              (oItem) =>
                new ViewSettingsItem({
                  // Convert unique values into ViewSettingsItem objects.
                  text: oItem,
                  key: columnId + "___" + "EQ___" + oItem, // JSON property = Unique value
                })
            );
          console.log("columnId", columnId);
          console.log("oUniqueItems", oUniqueItems);

          // Set this values as selectable on the filter list
          oDialog.addFilterItem(
            new ViewSettingsFilterItem({
              key: columnId, // ID of the column && JSON property
              text: column.getAggregation("header").getProperty("text"), // Filter Name -> Column Text
              items: oUniqueFilterItems, // Set of possible values of the filter
            })
          );
        });
      },
      // ------grouping-----
      _presetGroupsInit: function (oDialog, oThis) {
        let oDialogParent = oDialog.getParent(),
          oTable = oDialogParent.byId("idMyTable"),
          oColumns = oTable.getColumns();

        this.mGroupFunctions = {};
        // Loop every column of the table
        oColumns.forEach((column) => {
          // let columnId = column.getId().split("--")[2]; // Get column ID (JSON Property)
          let columnId = column.getAggregation("header").getProperty("text"); // Get column ID (JSON Property)
          oDialog.addGroupItem(
            new ViewSettingsItem({
              // Convert column ID into ViewSettingsItem objects.
              key: columnId, // ID of the column && JSON property
              text: column.getAggregation("header").getProperty("text"), // Filter Name -> Column Text
            })
          );
          // Set group functions
          let groupFn = function (oContext) {
            var name = oContext.getProperty(columnId);
            return {
              key: name, // ID of the column && JSON property
              text: name, // Filter Name -> Column Text
            };
          };
          this.mGroupFunctions[columnId] = {};
          this.mGroupFunctions[columnId] = groupFn;
        });
      },

      handleConfirm: function (oEvent) {
        let oTable = this.byId("idMyTable"),
          mParams = oEvent.getParameters(),
          oBinding = oTable.getBinding("items"),
          aFilters = [],
          sPath,
          bDescending,
          aSorters = [],
          vGroup,
          aGroups = [];
        console.log("mParams", mParams);
        // Filtering
        if (mParams.filterItems) {
          mParams.filterItems.forEach(function (oItem) {
            let aSplit = oItem.getKey().split("___"),
              sPath = aSplit[0],
              sOperator = aSplit[1],
              sValue1 = aSplit[2],
              sValue2 = aSplit[3],
              oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
            aFilters.push(oFilter);
          });
          // apply filter settings
          oBinding.filter(aFilters);
          // update filter bar
          this.byId("suppliersFilterBar").setVisible(aFilters.length > 0);
          this.byId("suppliersFilterLabel").setText(mParams.filterString);
        }
        // Sorting
        if (mParams.sortItem) {
          sPath = mParams.sortItem.getKey();
          console.log("sPath", sPath);
          bDescending = mParams.sortDescending;
          aSorters.push(new Sorter(sPath, bDescending));
          // apply the selected sort and group settings
          oBinding.sort(aSorters);
        }
        // Grouping
        if (mParams.groupItem) {
          sPath = mParams.groupItem.getKey();
          bDescending = mParams.groupDescending;
          vGroup = this.mGroupFunctions[sPath];
          aGroups.push(new Sorter(sPath, bDescending, vGroup));
          // apply the selected group settings
          oBinding.sort(aGroups);
        } else if (this.groupReset) {
          oBinding.sort();
          this.groupReset = false;
        }
      },

      // --------------------------------------------------------On Save button press--------------------->>>>>>>>>>>

      onSavePress: function () {
        
      },
    });
  }
);
