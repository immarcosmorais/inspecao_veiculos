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

		// deletaItem: function (oEvent) {
		// 	var oList = oEvent.getSource(),
		// 		oItem = oEvent.getParameter("listItem"),
		// 		sPath = oItem.getBindingContext().getPath();

		// 	// after deletion put the focus back to the list
		// 	oList.attachEventOnce("updateFinished", oList.focus, oList);

		// 	// send a delete request to the odata service
		// 	this.oProductModel.remove(sPath);

		// 	return sPath;
		// },

		_onStandardListDelete: function (oEvent) {

			var that = this;
			var oList = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem"),
				sPath = oItem.getBindingContext().getPath();

			oList.attachEventOnce("updateFinished", oList.focus, oList);

			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',

				content: new Text({
					text: 'Deseja deletar este cadastro de veículo?'
				}),
				beginButton: new Button({
					text: 'Sim',
					press: function () {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Não',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();

			// var dialog = new Dialog({
			// 	title: 'Warning',
			// 	type: 'Message',
			// 	state: 'Warning',
			// 	content: new Text({
			// 		text: 'Deseja deletar este cadastro de veículo?',
			// 		visible: true
			// 	}),
			// 	beginButton: new Button({
			// 		text: 'Sim',
			// 		press: function () {
			// 			dialog.close();
			// 		}
			// 	}),
			// 	afterClose: function () {
			// 		dialog.destroy();
			// 	}
			// });
			// dialog.open();

			// var sDialogName = "Dialog";
			// this.mDialogs = this.mDialogs || {};
			// var oDialog = this.mDialogs[sDialogName];

			// if (!oDialog) {
			// 	oDialog = new Dialog(this.getView());
			// 	this.mDialogs[sDialogName] = oDialog;
			// 	oDialog.setRouter(this.oRouter);
			// }
			// oDialog.open();

			// var sDialogName = "Dialog";
			// this.mDialogs = this.mDialogs || {};
			// var oDialog = this.mDialogs[sDialogName];
			// var oSource = oEvent.getParameter("listItem");
			// var oBindingContext = oSource.getBindingContext();
			// var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			// var oView;
			// if (!oDialog) {
			// 	this.getOwnerComponent().runAsOwner(function() {
			// 		oView = sap.ui.xmlview({
			// 			viewName: "com.sap.build.standard.formInspecaoDeVeiculos.view." + sDialogName
			// 		});
			// 		this.getView().addDependent(oView);
			// 		oView.getController().setRouter(this.oRouter);
			// 		oDialog = oView.getContent()[0];
			// 		this.mDialogs[sDialogName] = oDialog;
			// 	}.bind(this));
			// }

			// return new Promise(function(fnResolve) {
			// 	oDialog.attachEventOnce("afterOpen", null, fnResolve);
			// 	oDialog.open();
			// 	if (oView) {
			// 		oDialog.attachAfterOpen(function() {
			// 			oDialog.rerender();
			// 		});
			// 	} else {
			// 		oView = oDialog.getParent();
			// 	}

			// 	var oModel = this.getView().getModel();
			// 	if (oModel) {
			// 		oView.setModel(oModel);
			// 	}
			// 	if (sPath) {
			// 		var oParams = oView.getController().getBindingParameters();
			// 		oView.bindObject({
			// 			path: sPath,
			// 			parameters: oParams
			// 		});
			// 	}
			// }.bind(this)).catch(function(err) {
			// 	if (err !== undefined) {
			// 		MessageBox.error(err.message);
			// 	}
			// });

		},

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ListarVeiculos").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
		}
	});
}, /* bExport= */ true);