/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "learn/model/models",
        'sap/ui/model/json/JSONModel',
        'sap/f/library'
    ],
    function (UIComponent, Device, models,JSONModel,fioriLibrary) {
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
            // init: function () {
            //     var oProductsModel;
            //     // call the base component's init function
            //     UIComponent.prototype.init.apply(this, arguments);

            //     // set products demo model on this sample
			//     oProductsModel = new JSONModel(sap.ui.require.toUrl('learn/model/products.json'));
            //     console.log('oProductsModel',oProductsModel);

            //     oProductsModel.setSizeLimit(1000);

            //     // enable routing
            //     this.getRouter().initialize();

            //     // set the device model
            //     // this.setModel(models.createDeviceModel(), "device");
            //     this.setModel(oProductsModel, "products");
            // }


            init: function () {
                var oModel,
                    oProductsModel,
                    oRouter;
    
                UIComponent.prototype.init.apply(this, arguments);
    
                oModel = new JSONModel();
                this.setModel(oModel);
    
                // set products demo model on this sample
                oProductsModel = new JSONModel(sap.ui.require.toUrl('learn/model/products.json'));
                oProductsModel.setSizeLimit(1000);
                this.setModel('products',oProductsModel);
    
                oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();
            },
    
            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout;

                console.log('sLayout',sLayout)
    
                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                }
    
                oModel.setProperty("/layout", sLayout);
            }
        });
    }
);