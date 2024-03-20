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
  
      return Controller.extend("crud1.controller.UsersList", {
        onInit: function () {},

        onClickSignup:function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Routecrud");

        },

        onClickLogin: function () {
          let that = this;
          let oModel = this.getView().getModel("DataModel");
          let oNewUserData = oModel.getProperty("/Login");
          let localUrl = this.getOwnerComponent()
            .getModel("mainModel")
            .getServiceUrl();
  
          let sUrl = localUrl + "Login"; // Replace this with your actual API endpoint URL
  
          // Make a POST request
          jQuery.ajax({
            url: sUrl,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(oNewUserData),
            success: function (data) {
              console.log("Logged in successfully:", data);
              MessageBox.success(data.value.message, {
                onClose: function (sAction) {
                  let oRouter = that.getOwnerComponent().getRouter();
                  // oRouter.navTo("RouteLoginPage");
                  MessageToast.show("Navigate to the landing page: " + sAction);
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
  