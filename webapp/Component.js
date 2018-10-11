sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/build/standard/formInspecaoDeVeiculos/model/models",
	"./model/errorHandling"
], function (UIComponent, Device, models, errorHandling) {
	"use strict";

	var navigationWithContext = {

	};

	return UIComponent.extend("com.sap.build.standard.formInspecaoDeVeiculos.Component", {

		metadata: {
			manifest: "json"
			
			// ,

			// rootView: {
			// 	"viewName": "com.sap.build.standard.formInspecaoDeVeiculos.view.App",
			// 	"type": "XML",
			// 	"async": true
			// },
			// routing: {
			// 	config: {
			// 		routerClass: "sap.m.routing.Router",
			// 		viewPath: "com.sap.build.standard.formInspecaoDeVeiculos.view",
			// 		controlId: "rootControl",
			// 		controlAggregation: "pages",
			// 		viewType: "XML",
			// 		async: true
			// 	},
			// 	routes: [{
			// 		name: "page1",
			// 		// empty hash - normally the start page
			// 		pattern: "",
			// 		target: "page1"
			// 	}, {
			// 		name: "page2",
			// 		pattern: "Page2",
			// 		target: "page2"
			// 	}, {
			// 		name: "page3",
			// 		pattern: "Page3",
			// 		target: "page3"
			// 	}, {
			// 		name: "page4",
			// 		pattern: "Page4",
			// 		target: "page4"
			// 	}],
			// 	targets: {
			// 		page1: {
			// 			viewName: "Menu",
			// 			viewLevel: 0
			// 		},
			// 		page2: {
			// 			viewName: "Identificaco",
			// 			viewLevel: 1
			// 		},
			// 		page3: {
			// 			viewName: "Inspecacao",
			// 			viewLevel: 2
			// 		},
			// 		page4: {
			// 			viewName: "Conclusao",
			// 			viewLevel: 3
			// 		}
			// 	}
			// }

		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the FLP model
			this.setModel(models.createFLPModel(), "FLP");

			// set the dataSource model
			this.setModel(new sap.ui.model.json.JSONModel({}), "dataSource");

			// set application model
			var oApplicationModel = new sap.ui.model.json.JSONModel({});
			this.setModel(oApplicationModel, "applicationModel");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// delegate error handling
			errorHandling.register(this);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		createContent: function () {
			var app = new sap.m.App({
				id: "App"
			});
			var appType = "App";
			var appBackgroundColor = "#FFFFFF";
			if (appType === "App" && appBackgroundColor) {
				app.setBackgroundColor(appBackgroundColor);
			}

			return app;
		},

		getNavigationPropertyForNavigationWithContext: function (sEntityNameSet, targetPageName) {
			var entityNavigations = navigationWithContext[sEntityNameSet];
			return entityNavigations == null ? null : entityNavigations[targetPageName];
		}

	});

});