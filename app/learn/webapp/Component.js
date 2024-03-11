/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "learn/model/models",
        'sap/ui/model/json/JSONModel'
    ],
    function (UIComponent, Device, models,JSONModel) {
        "use strict";

        return UIComponent.extend("learn.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                var oProductsModel;
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // set products demo model on this sample
			    oProductsModel = new JSONModel(sap.ui.require.toUrl('learn/model/products.json'));
                console.log('oProductsModel',oProductsModel);

                oProductsModel.setSizeLimit(1000);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                // this.setModel(models.createDeviceModel(), "device");
                this.setModel(oProductsModel, "products");
            }
        });
    }
);