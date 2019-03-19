sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	'sap/m/MessageToast',
	'sap/ui/model/Filter'
], function (BaseController, MessageBox, Utilities, History, MessageToast, Filter) {
	"use strict";

	var oStorage;

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Inspecao", {
		handleRouteMatched: function (oEvent) {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			if (oStorage.get("Crud") !== null) {
				if (oStorage.get("Crud").operacao == "create") {
					if (oStorage.get("Crud").pageReset == "inspecao") {
						this.resetPage();
						oStorage.put("Crud", {
							operacao: "create",
							pageReset: "conclusao"
						});
					}
				} else if (oStorage.get("Crud").operacao == "update") {
					if (oStorage.get("Crud").pageReset == "inspecao") {
						var sPath = oStorage.get("Crud").sPath;
						this.preenchePage(sPath);
						oStorage.put("Crud", {
							operacao: "update",
							pageReset: "conclusao",
							sPath: sPath
						});
					}
				}
			}

			var sAppId = "App5b9668732392e27ece51ff38";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

			this.aRadioButtonGroupIds = [
				"carroceriaRadioButton",
				"rb01",
				"rb02",
				"rb03",
				"rb04",
				"rb05",
				"rb06",
				"rb07",
				"rb08",
				"rb09",
				"rb10",
				"rb11",
				"rb12",
				"rb13"
			];
			this.handleRadioButtonGroupsSelectedIndex();

		},

		preenchePage: function (sPath) {
			var oView = this.getView(),
				oModel = this.oView.getModel();

			var caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.BusyDialog";
			var oDialog = sap.ui.xmlfragment(caminho, this);
			oDialog.open();

			oModel.read(sPath, {
				success: function (oData) {
					// Tipo de carroceria
					oView.byId("panel01").setExpanded(true);
					oView.byId("carroceriaRadioButton").setSelectedIndex(parseInt(oData.Carroceria));

					// Produtos
					oView.byId("panel02").setExpanded(true);
					// Set produtos

					// Últimas cargas transportadas
					oView.byId("panel03").setExpanded(true);
					oView.byId("c1UltiCargaInput").setValue(oData.C1UltimaCarga);
					oView.byId("c1PenuCargaInput").setValue(oData.C1PenultimaCarga);
					oView.byId("c1AnteCargaInput").setValue(oData.C1AntepeultCarga);
					oView.byId("c2UltiCargaInput").setValue(oData.C2UltimaCarga);
					oView.byId("c2PenuCargaInput").setValue(oData.C2PenultimaCarga);
					oView.byId("c2AnteCargaInput").setValue(oData.C2AntepeultCarga);

					// Tipo de limpeza
					oView.byId("panel04").setExpanded(true);
					// Sopro com ar comprimido (A)
					oView.byId("cb01").setSelected(oData.C1SoproAr);
					oView.byId("cb02").setSelected(oData.C2SoproAr);
					// Varredura (A)
					oView.byId("cb03").setSelected(oData.C1Varredura);
					oView.byId("cb04").setSelected(oData.C2Varredura);
					// Lavagem com água (B)
					oView.byId("cb05").setSelected(oData.C1Lavagem);
					oView.byId("cb06").setSelected(oData.C2Lavagem);
					// Vaporização (com vapor d'água) (C)
					oView.byId("cb07").setSelected(oData.C1Vaporizacao);
					oView.byId("cb08").setSelected(oData.C2Vaporizacao);
					// Lavagem com água e agente de limpeza (C)
					oView.byId("cb09").setSelected(oData.C1Lavagem02);
					oView.byId("cb10").setSelected(oData.C2Lavagem02);
					// Lavagem com água e agente de desinfecção (D)
					oView.byId("cb11").setSelected(oData.C1Lavagem03);
					oView.byId("cb12").setSelected(oData.C2Lavagem03);

					// Condições do veículo
					oView.byId("panel05").setExpanded(true);
					if (oData.CondicaoVeiculo01 !== null) {
						oView.byId("rb01").setSelectedIndex(parseInt(oData.CondicaoVeiculo01) + 1);
					}
					if (oData.CondicaoVeiculo02 !== null) {
						oView.byId("rb02").setSelectedIndex(parseInt(oData.CondicaoVeiculo02) + 1);
					}
					if (oData.CondicaoVeiculo03 !== null) {
						oView.byId("rb03").setSelectedIndex(parseInt(oData.CondicaoVeiculo03) + 1);
					}
					if (oData.CondicaoVeiculo04 !== null) {
						oView.byId("rb04").setSelectedIndex(parseInt(oData.CondicaoVeiculo04) + 1);
					}
					if (oData.CondicaoVeiculo05 !== null) {
						oView.byId("rb05").setSelectedIndex(parseInt(oData.CondicaoVeiculo05) + 1);
					}
					if (oData.CondicaoVeiculo06 !== null) {
						oView.byId("rb06").setSelectedIndex(parseInt(oData.CondicaoVeiculo06) + 1);
					}
					if (oData.CondicaoVeiculo07 !== null) {
						oView.byId("rb07").setSelectedIndex(parseInt(oData.CondicaoVeiculo07) + 1);
					}
					if (oData.CondicaoVeiculo08 !== null) {
						oView.byId("rb08").setSelectedIndex(parseInt(oData.CondicaoVeiculo08) + 1);
					}
					if (oData.CondicaoVeiculo09 !== null) {
						oView.byId("rb09").setSelectedIndex(parseInt(oData.CondicaoVeiculo09) + 1);
					}
					if (oData.CondicaoVeiculo10 !== null) {
						oView.byId("rb10").setSelectedIndex(parseInt(oData.CondicaoVeiculo10) + 1);
					}
					if (oData.CondicaoVeiculo11 !== null) {
						oView.byId("rb11").setSelectedIndex(parseInt(oData.CondicaoVeiculo11) + 1);
					}
					if (oData.CondicaoVeiculo12 !== null) {
						oView.byId("rb12").setSelectedIndex(parseInt(oData.CondicaoVeiculo12) + 1);
					}
					if (oData.CondicaoVeiculo13 !== null) {
						oView.byId("rb13").setSelectedIndex(parseInt(oData.CondicaoVeiculo13) + 1);
					}
					oDialog.close();
				},
				error: function (oError) {
					oDialog.close();
					MessageBox.error("erro ao prencheer campos");
					var rota = this.getOwnerComponent().getRouter();
					rota.navTo("Menu", false);
				}
			});

			var param = sPath.split("'")[1],
				url = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV/Produto?$filter=Text%20eq%20%27" + param + "%27",
				idProdutos = [],
				produtos = oView.byId("selectProdutos");
			var rota = this.getOwnerComponent().getRouter();

			jQuery.ajax({
				url: url,
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					for (var i = 0; i < data.d.results.length; i++) {
						idProdutos.push(data.d.results[i].Id);
					}
					produtos.setSelectedKeys(idProdutos);
				},
				error: function (e) {
					MessageBox.error("erro ao prencheer campos");
					rota.navTo("Menu", false);
				}
			});

		},

		resetPage: function () {

			this.getView().byId("panel01").setExpanded(true);

			//Produtos
			this.getView().byId("panel02").setExpanded(false);
			this.getView().byId("selectProdutos").removeAllSelectedItems();

			//Últimas cargas transportadas
			this.getView().byId("panel03").setExpanded(false);
			this.getView().byId("c1UltiCargaInput").setValue("");
			this.getView().byId("c1PenuCargaInput").setValue("");
			this.getView().byId("c1AnteCargaInput").setValue("");
			this.getView().byId("c2UltiCargaInput").setValue("");
			this.getView().byId("c2PenuCargaInput").setValue("");
			this.getView().byId("c2AnteCargaInput").setValue("");

			//Tipo de limpeza
			this.getView().byId("panel04").setExpanded(false);
			this.getView().byId("cb01").setSelected(false);
			this.getView().byId("cb02").setSelected(false);
			this.getView().byId("cb03").setSelected(false);
			this.getView().byId("cb04").setSelected(false);
			this.getView().byId("cb05").setSelected(false);
			this.getView().byId("cb06").setSelected(false);
			this.getView().byId("cb07").setSelected(false);
			this.getView().byId("cb08").setSelected(false);
			this.getView().byId("cb09").setSelected(false);
			this.getView().byId("cb10").setSelected(false);
			this.getView().byId("cb11").setSelected(false);
			this.getView().byId("cb12").setSelected(false);

			//Condições do veículo
			this.getView().byId("panel05").setExpanded(false);

			this.getView().byId("carroceriaRadioButton").setSelectedIndex(0);
			this.getView().byId("rb01").setSelectedIndex(0);
			this.getView().byId("rb02").setSelectedIndex(0);
			this.getView().byId("rb03").setSelectedIndex(0);
			this.getView().byId("rb04").setSelectedIndex(0);
			this.getView().byId("rb05").setSelectedIndex(0);
			this.getView().byId("rb06").setSelectedIndex(0);
			this.getView().byId("rb07").setSelectedIndex(0);
			this.getView().byId("rb08").setSelectedIndex(0);
			this.getView().byId("rb09").setSelectedIndex(0);
			this.getView().byId("rb10").setSelectedIndex(0);
			this.getView().byId("rb11").setSelectedIndex(0);
			this.getView().byId("rb12").setSelectedIndex(0);
			this.getView().byId("rb13").setSelectedIndex(0);

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
			var oRadioButtonGroup = this.byId("carroceriaRadioButton");
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
		convertTextToIndexFormatter1: function (sTextValue) {
			var oRadioButtonGroup = this.byId("carroceriaRadioButton");
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
		_onRadioButtonGroupSelect1: function () {

		},
		convertTextToIndexFormatter2: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb01");
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
		_onRadioButtonGroupSelect2: function () {

		},
		convertTextToIndexFormatter3: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb02");
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
		_onRadioButtonGroupSelect3: function () {

		},
		convertTextToIndexFormatter4: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb03");
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
		_onRadioButtonGroupSelect4: function () {

		},
		convertTextToIndexFormatter5: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb04");
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
		_onRadioButtonGroupSelect5: function () {

		},
		convertTextToIndexFormatter6: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb05");
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
		_onRadioButtonGroupSelect6: function () {

		},
		convertTextToIndexFormatter7: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb06");
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
		_onRadioButtonGroupSelect7: function () {

		},
		convertTextToIndexFormatter8: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb07");
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
		_onRadioButtonGroupSelect8: function () {

		},
		convertTextToIndexFormatter9: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb08");
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
		_onRadioButtonGroupSelect9: function () {

		},
		convertTextToIndexFormatter10: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb09");
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
		_onRadioButtonGroupSelect10: function () {

		},
		convertTextToIndexFormatter11: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb10");
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
		_onRadioButtonGroupSelect11: function () {

		},
		convertTextToIndexFormatter12: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb11");
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
		_onRadioButtonGroupSelect12: function () {

		},
		convertTextToIndexFormatter13: function (sTextValue) {
			var oRadioButtonGroup = this.byId("rb12");
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
		_onRadioButtonGroupSelect13: function () {

		},
		_onButtonPress: function (oEvent) {
			this._inputDados();

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("Conclusao", oBindingContext, fnResolve, "");
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

						//  If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
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

		handleSelectionChange: function (oEvent) {
			var changedItem = oEvent.getParameter("changedItem");
			var isSelected = oEvent.getParameter("selected");

			var state = " selecionado";
			if (!isSelected) {
				state = " retirado";
			}

			MessageToast.show(changedItem.getText() + state, {
				width: "auto"
			});

		},

		handleSelectionFinish: function (oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			var messageText = "Produto(s) selecionado(s): [ ";

			for (var i = 0; i < selectedItems.length; i++) {
				messageText += "'" + selectedItems[i].getText() + "'";
				if (i !== selectedItems.length - 1) {
					messageText += ", ";
				}
			}

			messageText += " ]";
			MessageToast.show(messageText, {
				width: "auto"
			});

		},

		_inputDados: function () {

			var dados = {
				carroceria: this.getView().byId("carroceriaRadioButton").getSelectedIndex() + "",
				ultimas_cargas: {
					compartimento1: {
						ulti_carga: this.getView().byId("c1UltiCargaInput").getValue(),
						penu_carga: this.getView().byId("c1PenuCargaInput").getValue(),
						ante_carga: this.getView().byId("c1AnteCargaInput").getValue()
					},
					compartimento2: {
						ulti_carga: this.getView().byId("c2UltiCargaInput").getValue(),
						penu_carga: this.getView().byId("c2PenuCargaInput").getValue(),
						ante_carga: this.getView().byId("c2AnteCargaInput").getValue()
					}
				},
				produtos: {
					chaves: this.getView().byId("selectProdutos").getSelectedKeys()
				},
				tipo_limpeza: {
					tipo_limpeza_01: {
						compartimento1: this.getView().byId("cb01").getSelected(),
						compartimento2: this.getView().byId("cb02").getSelected()
					},
					tipo_limpeza_02: {
						compartimento1: this.getView().byId("cb03").getSelected(),
						compartimento2: this.getView().byId("cb04").getSelected()
					},
					tipo_limpeza_03: {
						compartimento1: this.getView().byId("cb05").getSelected(),
						compartimento2: this.getView().byId("cb06").getSelected()
					},
					tipo_limpeza_04: {
						compartimento1: this.getView().byId("cb07").getSelected(),
						compartimento2: this.getView().byId("cb08").getSelected()
					},
					tipo_limpeza_05: {
						compartimento1: this.getView().byId("cb09").getSelected(),
						compartimento2: this.getView().byId("cb10").getSelected()
					},
					tipo_limpeza_06: {
						compartimento1: this.getView().byId("cb11").getSelected(),
						compartimento2: this.getView().byId("cb12").getSelected()
					}
				},
				condicao_limpeza: {
					condicoe01: this.getView().byId("rb01").getSelectedIndex() - 1 + "",
					condicoe02: this.getView().byId("rb02").getSelectedIndex() - 1 + "",
					condicoe03: this.getView().byId("rb03").getSelectedIndex() - 1 + "",
					condicoe04: this.getView().byId("rb04").getSelectedIndex() - 1 + "",
					condicoe05: this.getView().byId("rb05").getSelectedIndex() - 1 + "",
					condicoe06: this.getView().byId("rb06").getSelectedIndex() - 1 + "",
					condicoe07: this.getView().byId("rb07").getSelectedIndex() - 1 + "",
					condicoe08: this.getView().byId("rb08").getSelectedIndex() - 1 + "",
					condicoe09: this.getView().byId("rb09").getSelectedIndex() - 1 + "",
					condicoe10: this.getView().byId("rb10").getSelectedIndex() - 1 + "",
					condicoe11: this.getView().byId("rb11").getSelectedIndex() - 1 + "",
					condicoe12: this.getView().byId("rb12").getSelectedIndex() - 1 + "",
					condicoe13: this.getView().byId("rb13").getSelectedIndex() - 1 + ""
				}
			};
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			oStorage.put("inspecao", dados);
		},

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Inspecao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
		}
	});
}, /* bExport= */ true);