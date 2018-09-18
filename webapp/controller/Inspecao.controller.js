sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"./utilities",
		"sap/ui/core/routing/History"
	], function(BaseController, MessageBox, Utilities, History) {
		"use strict";
		return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Inspecao", {
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
			handleRadioButtonGroupsSelectedIndex: function() {
				var that = this;
				this.aRadioButtonGroupIds.forEach(function(sRadioButtonGroupId) {
					var oRadioButtonGroup = that.byId(sRadioButtonGroupId);
					var oButtonsBinding = oRadioButtonGroup ? oRadioButtonGroup.getBinding("buttons") : undefined;
					if (oButtonsBinding) {
						var oSelectedIndexBinding = oRadioButtonGroup.getBinding("selectedIndex");
						var iSelectedIndex = oRadioButtonGroup.getSelectedIndex();
						oButtonsBinding.attachEventOnce("change", function() {
							if (oSelectedIndexBinding) {
								oSelectedIndexBinding.refresh(true);
							} else {
								oRadioButtonGroup.setSelectedIndex(iSelectedIndex);
							}
						});
					}
				});
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
			convertTextToIndexFormatter: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536251559036-content-sap_m_RadioButtonGroup-1536251573633"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect: function() {},
			convertTextToIndexFormatter1: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect1: function() {},
			convertTextToIndexFormatter2: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect2: function() {},
			convertTextToIndexFormatter3: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect3: function() {},
			convertTextToIndexFormatter4: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258163169-content-sap_ui_layout_BlockLayoutCell-1536259558052-content-sap_m_RadioButtonGroup-1536259838771"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect4: function() {},
			convertTextToIndexFormatter5: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect5: function() {},
			convertTextToIndexFormatter6: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect6: function() {},
			convertTextToIndexFormatter7: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect7: function() {},
			convertTextToIndexFormatter8: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258645152-content-sap_ui_layout_BlockLayoutCell-1536259569307-content-sap_m_RadioButtonGroup-1536259889756"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect8: function() {},
			convertTextToIndexFormatter9: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect9: function() {},
			convertTextToIndexFormatter10: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-2-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect10: function() {},
			convertTextToIndexFormatter11: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-3-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect11: function() {},
			convertTextToIndexFormatter12: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536258828519-content-sap_ui_layout_BlockLayoutCell-1536260008355-content-sap_m_RadioButtonGroup-1536260031669"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect12: function() {},
			convertTextToIndexFormatter13: function(sTextValue) {
				var oRadioButtonGroup = this.byId(
					"sap_Responsive_Page_0-content-sap_m_ScrollContainer-1536251547090-content-sap_m_Panel-1536253615326-content-sap_ui_layout_BlockLayout-1536257480658-content-sap_ui_layout_BlockLayoutRow-1536260174884-content-sap_ui_layout_BlockLayoutCell-1-content-sap_m_RadioButtonGroup-2"
				);
				var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
				if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
					// look up index in bound context
					var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
					return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function(
						oButtonContext) {
						return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
					});
				} else {
					// look up index in static items
					return oRadioButtonGroup.getButtons().findIndex(function(oButton) {
						return oButton.getText() === sTextValue;
					});
				}
			},
			_onRadioButtonGroupSelect13: function() {},
			_onButtonPress: function(oEvent) {
				var oBindingContext = oEvent.getSource().getBindingContext();
				return new Promise(function(fnResolve) {
					this.doNavigate("Conclusao", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			},
			doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
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
				this.oRouter.getTarget("Inspecao").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			},
			/**
			 *@memberOf com.sap.build.standard.formInspecaoDeVeiculos.controller.Inspecao
			 * Marcos R. Morais
			 */
			_addItem: function() {
				/**
				var select = this.getView().byId("selectProdutos");
				var layout = this.getView().byId("layoutProdutos");
				layout.addContent(new sap.m.Text("asdfasdfsdf", "teste"));
				**/
				
				//Com ComboBox
				/**
				var cb = new sap.m.ComboBox();
				cb.setTooltip("Lista Itens");
				cb.setEditable(true);
				cb.setValue("item1");
				cb.setWidth("2009px");
				
				var item = new sap.ui.core.ListItem();
				item.setText("item1");
				
				cb.addItem(item);
				*/
				
				var oItemTemplate = new sap.ui.core.ListItem({
					key: "{Id}",
					text: "{Text}",
					additionalText: "{Addtext}"
				});
				
				var cb = new sap.m.ComboBox({items: { path: "/Produto",
										             template: oItemTemplate } });
					
				
					
				cb.setWidth("100%");
				var layout = this.getView().byId("layoutProdutos");
				layout.addContent(cb);
				
				
				/*var cb = new sap.m.ComboBox({items:[
						new sap.ui.core.ListItem({text:"Farelo de soja tostado granel", additionalText:""}),
						new sap.ui.core.ListItem({text:"Farelo de soja tostado ensaco", additionalText:""}),
						new sap.ui.core.ListItem({text:"Óleo de soja bruto degomado a granel", additionalText:""}),
						new sap.ui.core.ListItem({text:"Óleo de soja refinado(PET)", additionalText:""}),
						new sap.ui.core.ListItem({text:"Farelo de soja tostado granel", additionalText:""}),
						new sap.ui.core.ListItem({text:"Leticina de soja a granel", additionalText:""}),
						new sap.ui.core.ListItem({text:"Leticina em tambor/Bombona", additionalText:""}),
						new sap.ui.core.ListItem({text:"Ração a granel", additionalText:""}),
						new sap.ui.core.ListItem({text:"Ração (embalada)", additionalText:""}),
						new sap.ui.core.ListItem({text:"Fertilizantes", additionalText:""}),
						new sap.ui.core.ListItem({text:"Defensivos", additionalText:""}),
						new sap.ui.core.ListItem({text:"Grãos a granel", additionalText:""}),
						new sap.ui.core.ListItem({text:"Suplemento mineral", additionalText:""}),
						new sap.ui.core.ListItem({text:"Outros", additionalText:""})
					]});*/
				
				
			}
		});
	}, /* bExport= */
	true);