sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/ux3/ToolPopup",
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel'
], function(BaseController, MessageBox, Utilities, History, ToolPopup, Filter, JSONModel) {
	"use strict";
	
	var caminho = "";
	var filtro = "";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Identificacao", {
		handleRouteMatched: function(oEvent) {
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
		
		handleValueHelp : function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			
			if(this.inputId.toString().indexOf("tratorInput") != -1){
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogVeiculo";
				filtro = "Placa";
			}
			else if((this.inputId.toString().indexOf("reboque1Input") != -1) || (this.inputId.toString().indexOf("reboque2Input") != -1) ){
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogReboque";
				filtro = "Placa";
			}
			else if(this.inputId.toString().indexOf("motoristaInput") != -1){
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogMotorista";
				filtro = "Name1";
			}
			else if(this.inputId.toString().indexOf("fornecedorInput") != -1){
				caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.DialogFornecedor";
				filtro = "Name1";
			}
			
			
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(caminho,this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter(
				filtro,
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},

		_handleValueHelpSearch : function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				filtro,
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},
		
		_onPageNavButtonPress: function() {
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
		getQueryParameters: function(oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("Inspecao", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
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
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
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
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Identificacao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			
			//this.getView().getModel().setSizeLimit(1000000);
			//var oModel = new JSONModel(this.getView().getModel());
			//oModel.bindList('/Veiculo');
			//oModel.setSizeLimit(1000000);
			//this.getView().setModel(oModel);
			
		},
		onMetadataLoaded: function(myODataModel) {
			myODataModel.setSizeLimit(1000000);
		}
	});
}, /* bExport= */ true);
