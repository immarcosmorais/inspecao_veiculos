sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	'sap/m/MessageToast',
], function (BaseController, MessageBox, Utilities, History, MessageToast) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Inspecao", {
		handleRouteMatched: function (oEvent) {

			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			if (oStorage.get("Save").isSave) {
				if (oStorage.get("Reset").page2) {
					this.resetPage();
					oStorage.put("Reset", {
						page1: false,
						page2: false,
						page3: true
					});
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

		handleSelectionChange: function (oEvent) {
			var changedItem = oEvent.getParameter("changedItem");
			var isSelected = oEvent.getParameter("selected");

			var state = " selecionado";
			if (!isSelected) {
				state = " retirado";
			}

			// MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
			// 	width: "auto"
			// });

			MessageToast.show("Produto " + changedItem.getText() + state, {
				width: "auto"
			});

		},

		handleSelectionFinish: function (oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			var messageText = "Produto(s) selecionado(s): [";

			for (var i = 0; i < selectedItems.length; i++) {
				messageText += "'" + selectedItems[i].getText() + "'";
				if (i != selectedItems.length - 1) {
					messageText += ",";
				}
			}

			messageText += "]";

			MessageToast.show(messageText, {
				width: "auto"
			});
		},

		_inputDados: function () {

			// item = this.getView().byId("vBoxProdutos").getItems()[0].getItems()[0].getSelectedKey();

			// var oItem = this.getView().byId("vBoxProdutos").getItems();
			// var produtos = [];

			// jQuery.each(oItem, function (i, item) {
			// 	var flag = true;
			// 	for (var i = 0; i < produtos.length; i++) {
			// 		if (produtos[i] == item.getItems()[0].getSelectedKey()) {
			// 			flag = false;
			// 			break;
			// 		}
			// 	}
			// 	if (flag) {
			// 		produtos.push(item.getItems()[0].getSelectedKey());
			// 	}
			// });

			var dados = {
				carroceria: this.getView().byId("carroceriaRadioButton").getSelectedButton().getText(),
				ultima_cargas: {
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
					// chave: produtos
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
					condicoe01: this.getView().byId("rb01").getSelectedButton().getText(),
					condicoe02: this.getView().byId("rb02").getSelectedButton().getText(),
					condicoe03: this.getView().byId("rb03").getSelectedButton().getText(),
					condicoe04: this.getView().byId("rb04").getSelectedButton().getText(),
					condicoe05: this.getView().byId("rb05").getSelectedButton().getText(),
					condicoe06: this.getView().byId("rb06").getSelectedButton().getText(),
					condicoe07: this.getView().byId("rb07").getSelectedButton().getText(),
					condicoe08: this.getView().byId("rb08").getSelectedButton().getText(),
					condicoe09: this.getView().byId("rb09").getSelectedButton().getText(),
					condicoe10: this.getView().byId("rb10").getSelectedButton().getText(),
					condicoe11: this.getView().byId("rb11").getSelectedButton().getText(),
					condicoe12: this.getView().byId("rb12").getSelectedButton().getText(),
					condicoe13: this.getView().byId("rb13").getSelectedButton().getText()
				}
			};
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			oStorage.put("inspecao", dados);
		},

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Inspecao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);