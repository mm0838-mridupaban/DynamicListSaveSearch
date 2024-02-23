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
                console.log("Landing Page");
            },
            onSelect: function (oEvent) {
                // Get the selected column item
                var oSelectedItem = oEvent.getSource();

                // Access the details of the selected column
                var oColumnData = oSelectedItem.getBindingContext("mainModel").getObject();

                // Handle the column details as needed
                let table_id = oColumnData.table_id
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("TablePage", { table_id: table_id });
            },
        });
    });
