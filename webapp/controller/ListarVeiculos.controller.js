sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	'sap/m/Button',
	// "./Dialog",
	'sap/m/Dialog',
	'sap/m/Text',
	'sap/m/MessageToast',
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Button, Dialog, Text, MessageToast, Utilities, History) {
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
			var query = evt.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("Placa", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("listaVeiculos");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},

		_onStandardListDelete: function (oEvent) {

			var that = this;

			var oList = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem"),
				sPath = oItem.getBindingContext().getPath();

			oList.attachEventOnce("updateFinished", oList.focus, oList);

			var dialog = new Dialog({
				title: "Confirmar",
				type: "Message",
				horizontalScrolling: true,
				verticalScrolling: true,
				showHeader: true,
				content: new Text({
					text: "Deseja deletar este cadastro de veículo?",
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
						MessageToast.show("Veículo deletado com sucesso!");
						dialog.close();
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

		},

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ListarVeiculos").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
		}
	});
}, /* bExport= */ true);