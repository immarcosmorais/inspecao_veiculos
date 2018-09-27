sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/ux3/ToolPopup",
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException'
], function (BaseController, MessageBox, Utilities, History, ToolPopup, Filter, JSONModel, SimpleType, ValidateException) {
	"use strict";

	var caminho,
		filtro,
		gModelHelp,
		gModelCustom;
		

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Identificacao", {
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
		_onButtonPress: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("Inspecao", oBindingContext, fnResolve, "");
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

		//Auxiliar de pesquisa
		handleValueHelp: function (oEvent) {

			// this.getView().setModel(oModel);

			if (gModelHelp == null) {
				var sServiceUrl = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV";
				gModelHelp = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			}
			this.getView().setModel(gModelHelp);

			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();

			if (this.inputId.toString().indexOf("tratorInput") != -1) {
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogVeiculo";
				filtro = "Placa";
			} else if ((this.inputId.toString().indexOf("reboque1Input") != -1) || (this.inputId.toString().indexOf("reboque2Input") != -1)) {
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogReboque";
				filtro = "Placa";
			} else if (this.inputId.toString().indexOf("motoristaInput") != -1) {
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogMotorista";
				filtro = "Name1";
			} else if (this.inputId.toString().indexOf("fornecedorInput") != -1) {
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogFornecedor";
				filtro = "Name1";
			}

			// create value help dialog
			/**
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(caminho,this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			**/

			this._valueHelpDialog = sap.ui.xmlfragment(caminho, this);
			this.getView().addDependent(this._valueHelpDialog);

			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter(
				filtro,
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);

		},

		_handleValueHelpSearch: function (evt) {

			var sValue = evt.getParameter("value");
			sValue = sValue.toUpperCase();
			var oFilter = new Filter(
				filtro,
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose: function (evt) {
			var productInput, r1, r2, i1, i2, sValue;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				productInput = this.byId(this.inputId);
				sValue = oSelectedItem.getTitle();
			}
			gModelHelp = this.getView().getModel();
			if (this.inputId.toString().indexOf("tratorInput") != -1 && (oSelectedItem)) {
				r1 = gModelHelp.getData("/Veiculo('" + sValue + "')").Reboque1;
				r2 = gModelHelp.getData("/Veiculo('" + sValue + "')").Reboque2;
				i1 = this.getView().byId("reboque1Input");
				i2 = this.getView().byId("reboque2Input");
			}

			evt.getSource().getBinding("items").filter([]);

			// this.getView().setModel(gModelCustom);
			// sap.ui.getCore().getMessageManager().registerObject(this.getView().byId("tratorInput"), true);
			// sap.ui.getCore().getMessageManager().registerObject(this.getView().byId("reboque1Input"), true);
			// sap.ui.getCore().getMessageManager().registerObject(this.getView().byId("reboque2Input"), true);

			this.onInit();
			productInput.setValue(sValue);
			if (r1 != "") {
				i1.setValue(r1);
			}
			if (r2 != "") {
				i2.setValue(r2);
			}

		},

		customPlacaType: SimpleType.extend("placa", {

			//Esse método recebe o valor analisado (valor interno) como um parâmetro e deve retornar um valor formatado 
			//(ou seja, um valor externo correspondente). Esse valor formatado é exibido na interface do usuário.
			formatValue: function (oValue) {
				return oValue;
			},

			//Este método recebe a entrada do usuário como um parâmetro. 
			//O trabalho deste método é converter o valor do usuário (valor externo) em
			//uma representação interna adequada do valor (valor interno).
			parseValue: function (oValue) {
				//parsing step takes place before validating step, value could be altered here
				return oValue;
			},

			//Esse método recebe o valor analisado (ou seja, a representação interna do valor 
			//conforme determinado pelo método parseValue ) e deve decidir se o valor é válido ou não. 
			//Se a entrada for determinada como inválida, uma exceção do tipo 
			//sap.ui.model.ValidateException deve ser lançada de dentro desse método.
			validateValue: function (oValue) {
				// The following Regex is NOT a completely correct one and only used for demonstration purposes.
				// RFC 5322 cannot even checked by a Regex and the Regex for RFC 822 is very long and complex.
				oValue = oValue.toUpperCase();
				var rexMail = '[A-Z]{3}\[0-9]{4}';
				if (!oValue.match(rexMail)) {
					throw new ValidateException("'" + oValue + "' não é uma placa válida.");
				}
			}
		}),

		onInit: function () {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Identificacao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			if (gModelCustom == null) {
				gModelCustom = new JSONModel({
					placa: ""
				});
			}

			this.getView().setModel(gModelCustom);
			sap.ui.getCore().getMessageManager().registerObject(this.getView().byId("tratorInput"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.getView().byId("reboque1Input"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.getView().byId("reboque2Input"), true);

		},

		onMetadataLoaded: function (myODataModel) {
			myODataModel.setSizeLimit(1000000);
		}
	});
}, /* bExport= */ true);