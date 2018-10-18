sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"./utilities",
		"sap/ui/core/routing/History"
	], function (BaseController, MessageBox, Utilities, History) {
		"use strict";

		var idElements = 0;

		return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Inspecao", {
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
					"carroceriaRadioButton"
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
			_onRadioButtonGroupSelect: function () {},
			convertTextToIndexFormatter1: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb01"
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
			_onRadioButtonGroupSelect1: function () {},
			convertTextToIndexFormatter2: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb02"
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
			_onRadioButtonGroupSelect2: function () {},
			convertTextToIndexFormatter3: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb03"
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
			_onRadioButtonGroupSelect3: function () {},
			convertTextToIndexFormatter4: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb04"
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
			_onRadioButtonGroupSelect4: function () {},
			convertTextToIndexFormatter5: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb05"
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
			_onRadioButtonGroupSelect5: function () {},
			convertTextToIndexFormatter6: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb06"
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
			_onRadioButtonGroupSelect6: function () {},
			convertTextToIndexFormatter7: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb07"
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
			_onRadioButtonGroupSelect7: function () {},
			convertTextToIndexFormatter8: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb08"
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
			_onRadioButtonGroupSelect8: function () {},
			convertTextToIndexFormatter9: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb09"
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
			_onRadioButtonGroupSelect9: function () {},
			convertTextToIndexFormatter10: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb10"
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
			_onRadioButtonGroupSelect10: function () {},
			convertTextToIndexFormatter11: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb11"
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
			_onRadioButtonGroupSelect11: function () {},
			convertTextToIndexFormatter12: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb12"
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
			_onRadioButtonGroupSelect12: function () {},
			convertTextToIndexFormatter13: function (sTextValue) {
				var oRadioButtonGroup = this.byId(
					"rb13"
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
			_onRadioButtonGroupSelect13: function () {},
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
				var sPath = oBindingContext ? oBindingContext.getPath() : null;
				var oModel = oBindingContext ? oBindingContext.getModel() : null;
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

			_deleteItem: function (element) {

				var id = element.getParameter("id").split("btnDelete")[1];
				var vBoxProdutos = this.getView().byId("vBoxProdutos");
				var vBoxBotoes = this.getView().byId("vBoxBotoes");
				var arrayItems = vBoxProdutos.getItems();
				if (arrayItems.length > 1) {
					vBoxProdutos.removeItem("vBoxProdutos" + id);
					vBoxBotoes.removeItem("hBoxBotoes" + id);
				}

			},

			_addItem: function () {

				var vBoxBotoes = this.getView().byId("vBoxBotoes");
				var vBoxProdutos = this.getView().byId("vBoxProdutos");
				var value = "";

				try {
					var arrayItems = vBoxProdutos.getItems();
					var item = arrayItems[arrayItems.length - 1];
					var sp = item.getItems();
					value = sp[0].getProperty("value");
				} catch (e) {

				}

				if (value != "" || idElements == 0) {

					var itemTemplate = new sap.ui.core.ListItem({
						key: "{Id}",
						text: "{Text}",
						additionalText: "{Addtext}"
					});

					var selectProdutos = new sap.m.ComboBox("selectProdutos" + idElements, {
						items: {
							path: "/Produto",
							template: itemTemplate
						},
						width: "100%",
						maxWidth: "100%",
						icon: "",
						enabled: true,
						type: "Default",
						textAlign: "Initial",
						valueState: "None",
						forceSelection: false
					});

					var oVBox1 = new sap.m.VBox("vBoxProdutos" + idElements, {
						items: [
							selectProdutos
						],
						alignItems: "Stretch",
						direction: "Column",
						fitContainer: false,
						width: "auto",
						hight: "auto",
						justifyContent: "Start",
						renderType: "Div",
						visible: true,
						displayInline: false,
					});
					oVBox1.addStyleClass("sapUiTinyMargin");
					vBoxProdutos.addItem(oVBox1);

					var btnDelete = new sap.m.Button("btnDelete" + idElements, {
						type: "Default",
						icon: "sap-icon://delete",
						iconFirst: true,
						width: "auto",
						enabled: true,
						visible: true,
						iconDensityAware: false
					});
					btnDelete.addStyleClass("sapUiTinyMarginBegin");
					btnDelete.attachPress(this._deleteItem, this);

					var btnAdd = new sap.m.Button("btnAdd" + idElements, {
						type: "Default",
						icon: "sap-icon://add",
						iconFirst: true,
						width: "auto",
						enabled: true,
						visible: true,
						iconDensityAware: false
					});
					btnAdd.addStyleClass("sapUiTinyMarginBegin");
					btnAdd.attachPress(this._addItem, this);

					var oHBox2 = new sap.m.HBox("hBoxBotoes" + idElements, {
						items: [
							btnDelete,
							btnAdd
						],
						alignItems: "Center",
						direction: "Row",
						fitContainer: false,
						width: "auto",
						height: "auto",
						justifyContent: "Center",
						renderType: "Div",
						visible: true,
						displayInline: false
					});
					oHBox2.addStyleClass("sapUiTinyMargin");

					vBoxBotoes.addItem(oHBox2);

					idElements++;

				} else {
					MessageBox.warning("É necessário selecionar um item para definir um novo.");
				}
			},

			_inputDados: function () {

				// item = this.getView().byId("vBoxProdutos").getItems()[0].getItems()[0].getSelectedKey();

				var oItem = this.getView().byId("vBoxProdutos").getItems();
				var produtos = [];

				jQuery.each(oItem, function (i, item) {
					var flag = true;
					for (var i = 0; i < produtos.length; i++) {
						if (produtos[i] == item.getItems()[0].getSelectedKey()) {
							flag = false;
							break;
						}
					}
					if (flag) {
						produtos.push(item.getItems()[0].getSelectedKey());
					}
				});

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
						chave: produtos
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
				this._addItem();
			}

		});
	}, /* bExport= */
	true);