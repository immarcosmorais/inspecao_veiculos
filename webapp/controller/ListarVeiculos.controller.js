sap.ui.define(["sap/ui/core/mvc/Controller",
	'./Formatter',
	"sap/m/MessageBox",
	'sap/m/Button',
	// "./Dialog",
	'sap/m/Dialog',
	'sap/m/Text',
	'sap/m/MessageToast',
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, Formatter, MessageBox, Button, Dialog, Text, MessageToast, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.ListarVeiculos", {
		handleRouteMatched: function (oEvent) {
			var oParams = {};

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

		_onStandardListItemPress: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("Identificacao", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},

		_onPageNavButtonPress: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},

		getQueryParameters: function (oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},

		handleSearch: function (evt) {
			// create model filter
			var filters = [];
			var query = evt.getSource().getValue();
			query = query.toUpperCase();
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("Veiculo", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("listaVistoria");
			var binding = list.getBinding("items");
			binding.filter(filters, "Application");
		},

		_onStandardListDelete: function (oEvent) {
			var sUrl = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			var oList = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem"),
				// sPath = oItem.getBindingContext().getPath().split("(")[1].split(")")[0];
				sPath = oItem.getBindingContext().getPath();

			oList.attachEventOnce("updateFinished", oList.focus, oList);

			//Chamando fragment
			var caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.BusyDialog";
			var oDialog = sap.ui.xmlfragment(caminho, this);
			// oDialog.open();

			var dialog = new Dialog({
				title: "Confirmar",
				type: "Message",
				horizontalScrolling: true,
				verticalScrolling: true,
				showHeader: true,
				content: new Text({
					text: "Deseja deletar este cadastro de vistoria?",
					width: "100%",
					maxLines: 1,
					textAlign: "Center",
					textDirection: "Inherit",
					visible: true
				}),
				beginButton: new Button({
					text: "Sim",
					type: "Accept",
					icon: "sap-icon://accept",
					iconFirst: true,
					widht: "auto",
					enabled: true,
					visible: true,
					addStyleClass: "sapUiTinyMargin",
					press: function () {
						oDialog.open();
						jQuery.sap.delayedCall(500, this, function () {
							oModel.remove(sPath, {
								// groupId: "group1",
								method: "DELETE",
								success: function (data) {
									oDialog.close();
									dialog.close();
									MessageToast.show("Vistoria deletado com sucesso!");
								},
								error: function (e) {
									oDialog.close();
									dialog.close();
									MessageBox.error('Erro ao deletar o vistoria!');
								}
							});
						});
					}
				}),
				endButton: new Button({
					text: "Não",
					type: "Reject",
					icon: "sap-icon://negative",
					iconFirst: true,
					widht: "auto",
					enabled: true,
					visible: true,
					addStyleClass: "sapUiTinyMargin",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
			jQuery.sap.delayedCall(500, this, function () {
				oEvent.getSource().getModel().refresh(true);
			});
			
		},

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ListarVeiculos").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
		}
	});
}, /* bExport= */ true);