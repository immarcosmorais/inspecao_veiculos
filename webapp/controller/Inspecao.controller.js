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
				
				// var hBoxProdutos = this.getView().byId("hBoxProdutos" + id);
				// var hBoxBotoes = this.getView().byId("hBoxBotoes" + id);
				
				vBoxProdutos.removeItem("hBoxProdutos" + id);
				vBoxBotoes.removeItem("hBoxBotoes" + id);

				// vBoxProdutos.removeItem(this.getView().byId("hBoxProdutos" + id[1]));
				// vBoxBotoes.removeItem(this.getView().byId("hBoxBotoes" + id[1]));
				// sap.ui.getCore().byId("hBoxBotoes" + id).exit());
				// sap.ui.getCore().byId("hBoxProdutos" + id).exit());
				// this.getView().byId("hBoxBotoes" + id).removeAllContent();
				// this.getView().byId("hBoxProdutos" + id).removeAllContent();
			},

			_addItem: function () {

				var itemTemplate = new sap.ui.core.ListItem({
					key: "{Id}",
					text: "{Text}",
					additionalText: "{Addtext}"
				});

				var selectProdutos = new sap.m.ComboBox("selectProdutos" + idElements, {
					items: {
						path: "/Produto",
						template: itemTemplate
					}
				});
				selectProdutos.setWidth("100%");
				selectProdutos.setMaxWidth("100%");
				selectProdutos.setEnabled(true);
				selectProdutos.setPickerType("Default");
				selectProdutos.setTextAlign("Initial");
				selectProdutos.setValueState("None");

				var oHBox1 = new sap.m.HBox("hBoxProdutos" + idElements, {
					items: [
						selectProdutos
					]
				});
				oHBox1.setAlignItems("Stretch");
				oHBox1.setDirection("Row");
				oHBox1.setFitContainer(false);
				oHBox1.setWidth("100%");
				oHBox1.setHeight("100%");
				oHBox1.setJustifyContent("Center");
				oHBox1.setRenderType("Div");
				oHBox1.setVisible(true);
				oHBox1.setDisplayInline(false);
				oHBox1.addStyleClass("sapUiTinyMargin");

				var vBoxProdutos = this.getView().byId("vBoxProdutos");
				vBoxProdutos.addItem(oHBox1);

				var btnDelete = new sap.m.Button("btnDelete" + idElements);
				btnDelete.setType("Default");
				btnDelete.setIcon("sap-icon://delete");
				btnDelete.setIconFirst(true);
				btnDelete.setWidth("auto");
				btnDelete.setEnabled(true);
				btnDelete.setVisible(true);
				btnDelete.setIconDensityAware(false);
				btnDelete.attachPress(this._deleteItem, this);

				var btnAdd = new sap.m.Button("btnAdd" + idElements);
				btnAdd.setType("Default");
				btnAdd.setIcon("sap-icon://add");
				btnAdd.setIconFirst(true);
				btnAdd.setWidth("auto");
				btnAdd.setEnabled(true);
				btnAdd.setVisible(true);
				btnAdd.setIconDensityAware(false);
				btnAdd.addStyleClass("sapUiTinyMarginBegin");
				btnAdd.attachPress(this._addItem, this);

				var oHBox2 = new sap.m.HBox("hBoxBotoes" + idElements, {
					items: [
						btnDelete,
						btnAdd
					]
				});
				oHBox2.setAlignItems("Center");
				oHBox2.setDirection("Row");
				oHBox2.setFitContainer(false);
				oHBox2.setWidth("100%");
				oHBox2.setHeight("100%");
				oHBox2.setJustifyContent("Center");
				oHBox2.setRenderType("Div");
				oHBox2.setVisible(true);
				oHBox2.setDisplayInline(false);
				oHBox2.addStyleClass("sapUiTinyMargin");

				var vBoxBotoes = this.getView().byId("vBoxBotoes");
				vBoxBotoes.addItem(oHBox2);

				idElements++;
			},

			onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("Inspecao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
				this._addItem();
			}

		});
	}, /* bExport= */
	true);