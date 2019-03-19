sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Utilities, History) {
	"use strict";

	var oStorage;

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Menu", {

		handleRouteMatched: function (oEvent) {
			var oParams = {};

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

			if (oStorage.get("Crud") !== null) {
				if (oStorage.get("Crud").operacao !== "create") {
					oStorage.clear();
					oStorage.removeAll();

					oStorage.put("Crud", {
						operacao: "create",
						pageReset: "identificacao"
					});

				}
			}

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}

		},
		_onGenericTilePress: function (oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext();
			return new Promise(function (fnResolve) {
				this.doNavigate("Identificacao", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});
		},

		_onGenericTilePress1: function (oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext();
			return new Promise(function (fnResolve) {
				this.doNavigate("ListarVeiculos", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});
		},

		doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		},

		onInit: function () {
			// this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Menu").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);