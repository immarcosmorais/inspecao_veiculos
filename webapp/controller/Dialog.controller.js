sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Dialog2", {
		setRouter: function(oRouter) {
			this.oRouter = oRouter;

		},
		getBindingParameters: function() {
			return {};

		},
		_onButtonPress: function(oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function(fnResolve) {
					fnResolve(true);
				})
				.then(function(result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function(fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();
							oModel.remove(oSourceBindingContext.getPath(), {
								success: function() {
									oModel.refresh();
									fnResolve();
								},
								error: function() {
									oModel.refresh();
									fnReject(new Error("remove failed"));
								}
							});
						}
					});

				}.bind(this))
				.then(function(result) {
					if (result === false) {
						return false;
					} else {

						var oDialog = this.getView().getContent()[0];

						return new Promise(function(fnResolve) {
							oDialog.attachEventOnce("afterClose", null, fnResolve);
							oDialog.close();
						});

					}
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onButtonPress1: function() {

			var oDialog = this.getView().getContent()[0];

			return new Promise(function(fnResolve) {
				oDialog.attachEventOnce("afterClose", null, fnResolve);
				oDialog.close();
			});

		},
		onInit: function() {

			this._oDialog = this.getView().getContent()[0];

		},
		onExit: function() {
			this._oDialog.destroy();

		}
	});
}, /* bExport= */ true);
