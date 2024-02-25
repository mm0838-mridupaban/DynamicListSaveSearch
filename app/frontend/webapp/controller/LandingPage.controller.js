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

// --------------------Creating Table List------------------------------------>>>

              onCreate: function () {
                let oModel = this.getView().getModel("tableDataModel");
                let newTable = oModel.getProperty("/NewTable");

                var sUrl = this.getOwnerComponent().getModel("mainModel").getServiceUrl() + "TablesList";
                var that = this;

                // Sending data to backend-------------------------
                $.ajax({
                    headers: {
                        "X-Requested-With": "XMLHttpsRequest"
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
                        // MessageBox.error(xhr.status, xhr.statusText)
                        MessageBox.error(`${xhr.status} ${xhr.statusText}`);
                        console.error("Error posting data:", xhr.status, xhr.statusText,status);
                        if (xhr.responseJSON && xhr.responseJSON.message) {
                            console.error("Error message:", xhr.responseJSON.message);
                        } else {
                            console.error("Error details:", error);
                        }
                    }
                });
                
            },








        });
    });

    