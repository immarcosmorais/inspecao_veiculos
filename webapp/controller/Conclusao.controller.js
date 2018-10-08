sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, Utilities, History, JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Conclusao", {
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

			this.aRadioButtonGroupIds = [
				"sap_Responsive_Page_0-content-build_simple_form_Form-1536262336890-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_RadioButtonGroup-1536262370237"
			];
			this.handleRadioButtonGroupsSelectedIndex();

		},
		handleRadioButtonGroupsSelectedIndex: function () {
			var that = this;
			this.aRadioButtonGroupIds.forEach(function (sRadioButtonGroupId) {
				var oRadioButtonGroup = that.byId(sRadioButtonGroupId);
				var oButtonsBinding = oRadioButtonGroup ? oRadioButtonGroup.getBinding("buttons") : undefined;
				if (oButtonsBinding) {
					var oSelectedIndexBinding = oRadioButtonGroup.getBinding("selectedIndex");
					var iSelectedIndex = oRadioButtonGroup.getSelectedIndex();
					oButtonsBinding.attachEventOnce("change", function () {
						if (oSelectedIndexBinding) {
							oSelectedIndexBinding.refresh(true);
						} else {
							oRadioButtonGroup.setSelectedIndex(iSelectedIndex);
						}
					});
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
		convertTextToIndexFormatter: function (sTextValue) {
			var oRadioButtonGroup = this.byId(
				"sap_Responsive_Page_0-content-build_simple_form_Form-1536262336890-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_RadioButtonGroup-1536262370237"
			);
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (
					oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect: function () {

		},
		_onButtonPress: function () {

			this._inputDados();

			var oView = this.getView();
			var oController = this;
			this._cadastrar();

			return new Promise(function (fnResolve, fnReject) {
				var oModel = oController.oModel;

				var fnResetChangesAndReject = function (sMessage) {
					oModel.resetChanges();
					fnReject(new Error(sMessage));
				};
				if (oModel && oModel.hasPendingChanges()) {
					oModel.submitChanges({
						success: function (oResponse) {
							var oBatchResponse = oResponse.__batchResponses[0];
							var oChangeResponse = oBatchResponse.__changeResponses && oBatchResponse.__changeResponses[0];
							if (oChangeResponse && oChangeResponse.data) {
								var sNewContext = oModel.getKey(oChangeResponse.data);
								oView.unbindObject();
								oView.bindObject({
									path: "/" + sNewContext
								});
								if (window.history && window.history.replaceState) {
									window.history.replaceState(undefined, undefined, window.location.hash.replace(encodeURIComponent(oController.sContext),
										encodeURIComponent(sNewContext)));
								}
								oModel.refresh();
								fnResolve();
							} else if (oChangeResponse && oChangeResponse.response) {
								fnResetChangesAndReject(oChangeResponse.message);
							} else if (!oChangeResponse && oBatchResponse.response) {
								fnResetChangesAndReject(oBatchResponse.message);
							} else {
								oModel.refresh();
								fnResolve();
							}
						},
						error: function (oError) {
							fnReject(new Error(oError.message));
						}
					});
				} else {
					fnResolve();
				}
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},

		_data: {
			"date": new Date()
		},

		_inputDados: function () {

			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

			var dados = {
				identificacao: oStorage.get("identificacao"),
				inspecao: oStorage.get("inspecao"),
				conclusao: {
					resultado: this.getView().byId("resultadoRb").getSelectedButton().getText(),
					data: this.getView().byId("dataInput").getValue(),
					observacao: this.getView().byId("obsInput").getValue()
				}
			};

			var model = this.getView().getModel();
			// model.loadDataNew("/sap/opu/odata/sap/ZGW_VISTORIA_SRV", dados, true, "POST");
			model.loadData("/sap/opu/odata/sap/ZGW_VISTORIA_SRV",dados, true, "POST");

		},

		onInit: function () {
			var oModel = new JSONModel(this._data);
			this.getView().setModel(oModel);
		}
	});
}, /* bExport= */ true);