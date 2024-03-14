sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("crud1.controller.crud", {
            onInit: function () {

            },
            onClickSignup:function(){
              console.log (this.getView().getModel('DataModel').getProperty("/NewUsers"))
            }
        });
    });
