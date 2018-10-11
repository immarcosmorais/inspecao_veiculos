sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/ux3/ToolPopup",
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	'sap/m/MessageToast'
], function (BaseController, MessageBox, Utilities, History, ToolPopup, Filter, JSONModel, SimpleType, ValidateException, MessageToast) {
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

		_testaCPF: function(strCPF) {
			var Soma;
			var Resto;
			Soma = 0;
			var i;
			if (strCPF == "00000000000") return false;

			for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
			Resto = (Soma * 10) % 11;

			if ((Resto == 10) || (Resto == 11)) Resto = 0;
			if (Resto != parseInt(strCPF.substring(9, 10))) return false;

			Soma = 0;
			for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
			Resto = (Soma * 10) % 11;

			if ((Resto == 10) || (Resto == 11)) Resto = 0;
			if (Resto != parseInt(strCPF.substring(10, 11))) return false;
			return true;
		},

		_onContinue: function (oEvent) {
			// collect input controls
			var oView = this.getView();
			var aInputs = [
				oView.byId("tratorInput"),
				oView.byId("reboque1Input"),
				oView.byId("reboque2Input"),
				// oView.byId("motoristaInput"),
				// oView.byId("cpfInput"),
			];
			var bValidationError = false;
			var rexMail = '[A-Z]{3}\[0-9]{4}';
			
			if(!this._testaCPF(this.getView().byId("cpfInput").getValue())){
				bValidationError = true;
				this.getView().byId("cpfInput").setValueState("Error");
			}
			
			this._testaCPF("");

			jQuery.each(aInputs, function (i, oInput) {

				var id = oInput.getId().split("application-BUILD-prototype-component---Identificacao--")[1];

				if ((id == "reboque1Input") || (id == "reboque2Input")) {
					if (oInput.getValue() != "") {
						//Campos Reboque 1 e Reboque 2 podem ser vazios, mas caso contrario, devem ser válidados
						if (!oInput.getValue().match(rexMail)) {
							oInput.setValueState("Error");
							bValidationError = true;
						}
					}
				} else if (id == "tratorInput") {
					if (!oInput.getValue().match(rexMail)) {
						oInput.setValueState("Error");
						bValidationError = true;
					}
				}
			});

			// output result
			if (!bValidationError) {
				this._inputDados();
				this._onButtonPress(oEvent);
			} else {
				MessageBox.alert("Alguns campos podem estar preenchidos incorretamente. Placas = 'ABC1234' e CPF = '000.000.000-00'");
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

		//Auxiliar de pesquisa
		handleValueHelp: function (oEvent) {

			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();

			// this.getView().setModel(gModelHelp);

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
			} else if (this.inputId.toString().indexOf("cpfInput") != -1) {
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogCPF";
				filtro = "Stcd2";
			}

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
			var productInput, r1 = "",
				r2 = "",
				i1, i2, i3, cpf = "",
				sValue;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				productInput = this.byId(this.inputId);
				sValue = oSelectedItem.getTitle();
			}
			
			gModelHelp = this.getView().getModel();
			i1 = this.getView().byId("reboque1Input");
			i2 = this.getView().byId("reboque2Input");
			i3 = this.getView().byId("cpfInput");

			if (this.inputId.toString().indexOf("tratorInput") != -1 && (oSelectedItem)) {
				r1 = gModelHelp.getData("/Veiculo('" + sValue + "')").Reboque1;
				r2 = gModelHelp.getData("/Veiculo('" + sValue + "')").Reboque2;
			}

			if (this.inputId.toString().indexOf("motoristaInput") != -1 && (oSelectedItem)) {
				cpf = gModelHelp.getData("/Motorista('" + sValue + "')").Stcd2;
			}

			productInput.setValue(sValue.toUpperCase());
			productInput.setValueState("None");
			if (r1 != "") {
				i1.setValue(r1.toUpperCase());
			}
			if (r2 != "") {
				i2.setValue(r2.toUpperCase());
			}
			if (cpf != "") {
				i3.setValue(cpf.toUpperCase());
			}
			i1.setValueState("None");
			i2.setValueState("None");
			i3.setValueState("None");
			evt.getSource().getBinding("items").filter([]);
		},

		handleLiveChange: function (oEvent) {
			var id = oEvent.getParameter("id").split("application-BUILD-prototype-component---Identificacao--");
			var input = this.getView().byId(id[1]);
			input.setValueState("None");
			input.setValue(input.getValue().toUpperCase());
		},

		onInit: function () {
			// var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("page3");
			// this.byId("link").setHref(sUrl);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Identificacao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
		},
		
		_inputDados: function(){
			var dados = {
				veiculo: this.getView().byId("tratorInput").getValue(),
				reboque1: this.getView().byId("reboque1Input").getValue(),
				reboque2: this.getView().byId("reboque2Input").getValue(),
				nome_motorista: this.getView().byId("motoristaInput").getValue(),
				cpf: this.getView().byId("cpfInput").getValue(),
			};
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			oStorage.put("identificacao", dados);
		},

		onMetadataLoaded: function (myODataModel) {
			myODataModel.setSizeLimit(1000000);
		}
	});
}, /* bExport= */ true);