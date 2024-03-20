sap.ui.define(
  ["sap/ui/core/mvc/Controller", 
  "sap/m/MessageBox",
  "sap/m/MessageToast"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox,MessageToast) {
    "use strict";

    return Controller.extend("crud1.controller.crud", {
      onInit: function () {},
      onClickSignup: function () {
        let that=this;
        let oModel = this.getView().getModel("DataModel");
        let oNewUserData = oModel.getProperty("/NewUsers");
        let localUrl = this.getOwnerComponent()
          .getModel("mainModel")
          .getServiceUrl();

        let sUrl = localUrl + "Signup"; // Replace this with your actual API endpoint URL

        // Make a POST request
        jQuery.ajax({
          url: sUrl,
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(oNewUserData),
          success: function (data) {
            console.log("User signed up successfully:", data);
            MessageBox.success(data.value.message, {
              onClose: function (sAction) {
                let oRouter = that.getOwnerComponent().getRouter();
                console.log('oRouter',oRouter)
                oRouter.navTo("RouteLoginPage");
                // MessageToast.show("Navigate to the login page: " + sAction);
              },
            });

            // Handle success, e.g., navigate to a success page
          },
          error: function (error) {
            console.error("Error signing up:", error);
            // Handle error
          },
        });
      },
    });
  }
);
