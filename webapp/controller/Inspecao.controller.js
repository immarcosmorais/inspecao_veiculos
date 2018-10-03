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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536251559036-content-sap_m_RadioButtonGroup-1536251573633",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-1536259558052-content-sap_m_RadioButtonGroup-1536259838771",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-1536259569307-content-sap_m_RadioButtonGroup-1536259889756",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-1536260008355-content-sap_m_RadioButtonGroup-1536260031669",
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536260174884-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536251559036-content-sap_m_RadioButtonGroup-1536251573633"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-1536259558052-content-sap_m_RadioButtonGroup-1536259838771"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-1536259569307-content-sap_m_RadioButtonGroup-1536259889756"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-1536260008355-content-sap_m_RadioButtonGroup-1536260031669"
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
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536260174884-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
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
					btnDelete.attachPress(this._deleteItem, this);
					btnDelete.addStyleClass("sapUiTinyMarginBegin");

					var btnAdd = new sap.m.Button("btnAdd" + idElements, {
						type: "Default",
						icon: "sap-icon://add",
						iconFirst: true,
						width: "auto",
						enabled: true,
						visible: true,
						iconDensityAware: false
					});
					btnAdd.attachPress(this._addItem, this);
					btnAdd.addStyleClass("sapUiTinyMarginBegin");

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
					MessageBox.alert("É necessário selecionar um item para definir um novo.");
				}
			},

			_onContinue: function (oEvent) {
				var bValidationError = false;

				// // collect input controls
				// var oView = this.getView();
				// var aInputs = [
				// 	oView.byId("tratorInput"),
				// 	oView.byId("reboque1Input"),
				// 	oView.byId("reboque2Input"),
				// 	oView.byId("motoristaInput"),
				// 	oView.byId("fornecedorInput")
				// ];
				// var bValidationError = false;
				// var rexMail = '[A-Z]{3}\[0-9]{4}';

				// // check that inputs are not empty
				// // this does not happen during data binding as this is only triggered by changes
				// jQuery.each(aInputs, function (i, oInput) {
				// 	// var oBinding = oInput.getBinding("value");
				// 	// try {
				// 	// 	oBinding.getType().validateValue(oInput.getValue());
				// 	// } catch (oException) {
				// 	// 	oInput.setValueState("Error");
				// 	// 	bValidationError = true;
				// 	// }
				// 	// if (oInput.getValue() == "" && oInput.getId().split("application-BUILD-prototype-component---Identificacao--") !="reboque2Input") {
				// 	// 	oInput.setValueState("Error");
				// 	// 	bValidationError = true;
				// 	// }
				// 	// if (oInput.getId().split("application-BUILD-prototype-component---Identificacao--")[1] == ("tratorInput" || "reboque1Input" ||
				// 	// 		"reboque2Input") && !oInput.getValue().match('[A-Z]{3}\[0-9]{4}')) {
				// 	// 	oInput.setValueState("Error");
				// 	// 	bValidationError = true;
				// 	// }

				// 	// 		var rexMail = '[A-Z]{3}\[0-9]{4}';
				// 	// 		if (!oValue.match(rexMail)) {
				// 	// 			throw new ValidateException("'" + oValue + "' não é uma placa válida.");
				// 	// 		}

				// 	var id = oInput.getId().split("application-BUILD-prototype-component---Identificacao--")[1];
				// 	if ((id != "reboque1Input") &&
				// 		(id != "reboque2Input") &&
				// 		(id != "tratorInput")) {
				// 		if (oInput.getValue() == "") {
				// 			oInput.setValueState("Error");
				// 			bValidationError = true;
				// 		}
				// 	} else {
				// 		if (oInput.getValue() != "" || id == "tratorInput") {
				// 			if (!oInput.getValue().match(rexMail)) {
				// 				oInput.setValueState("Error");
				// 				bValidationError = true;
				// 			}
				// 		}
				// 	}
				// });
				// output result
				
				var rbCarroceria = this.getView().byId("radioButtonCarroceria");
				if(rbCarroceria.getSelectedButton() != null){
					rbCarroceria.setValueState("Error");
					bValidationError = true;
				}
				
				if (!bValidationError) {
					this._onButtonPress(oEvent);
				} else {
					MessageBox.alert("Alguns campos podem estar vazios, ou as placas não estão no padrão correto (ABC1234)");
				}
			},

			onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("Inspecao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
				this._addItem();
			}

		});
	}, /* bExport= */
	true);