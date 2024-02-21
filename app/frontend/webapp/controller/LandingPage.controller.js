sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("frontend.controller.LandingPage", {
            onInit: function () {

            },
            onSelect: function (oEvent) {
                // Get the selected column item
                var oSelectedItem = oEvent.getSource();

                // Access the details of the selected column
                // var sColumnId = oSelectedItem.getId();
                var oColumnData = oSelectedItem.getBindingContext("mainModel").getObject();

                // Handle the column details as needed
                // console.log("Selected column ID:", sColumnId);
                console.log("Column data:", oColumnData.table_id);
                // Perform further processing, display in a dialog, etc.
                let table_id = oColumnData.table_id
                let oRouter = this.getOwnerComponent().getRouter();
                console.log("oRouter",oRouter)
                // oRouter.navTo("EmployeeDetails", { table_id: table_id });
                oRouter.navTo("TablePage", { table_id: table_id });
            },
        });
    });
