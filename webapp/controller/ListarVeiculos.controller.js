sap.ui.define(["sap/ui/core/mvc/Controller",
	'./Formatter',
	"sap/m/MessageBox",
	'sap/m/Button',
	// "./Dialog",
	'sap/m/Dialog',
	'sap/m/Text',
	'sap/m/MessageToast',
	"./utilities",
	"sap/ui/core/routing/History",
	'sap/ui/model/Sorter',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device'
], function (BaseController, Formatter, MessageBox, Button, Dialog, Text, MessageToast, Utilities, History, Sorter, Filter, JSONModel,
	Device) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.ListarVeiculos", {
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

			this.onRefresh();

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

		_onStandardListItemPress: function (oEvent) {

			var sPath = oEvent.getSource().getBindingContextPath(),
				status = this.getView().getModel().getData(sPath).Status,
				oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

			oStorage.removeAll();

			if (status === "A") {

				oStorage.put("Crud", {
					operacao: "update",
					pageReset: "identificacao",
					sPath: sPath
				});

				var oBindingContext = oEvent.getSource().getBindingContext();
				return new Promise(function (fnResolve) {

					this.doNavigate("Identificacao", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function (err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			} else {
				MessageToast.show("Não é possivel fazer alterações nessa vistoria");
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

		onDelete: function (oEvent) {
			var sUrl = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			var oList = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem"),
				sPath = oItem.getBindingContext().getPath(),
				status = this.getView().getModel().getData(sPath).Status;

			var oTable = this.byId("listaVistorias"),
				oBinding = oTable.getBinding("items");

			oList.attachEventOnce("updateFinished", oList.focus, oList);

			if (status === "A") {
				//Chamando fragment
				var caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.BusyDialog";
				var oDialog = sap.ui.xmlfragment(caminho, this);
				// oDialog.open();
				var dialog = new Dialog({
					title: "Confirmar",
					type: "Message",
					horizontalScrolling: true,
					verticalScrolling: true,
					showHeader: true,
					content: new Text({
						text: "Deseja deletar este cadastro de vistoria?",
						width: "100%",
						maxLines: 1,
						textAlign: "Center",
						textDirection: "Inherit",
						visible: true
					}),
					beginButton: new Button({
						text: "Sim",
						type: "Accept",
						icon: "sap-icon://accept",
						iconFirst: true,
						widht: "auto",
						enabled: true,
						visible: true,
						addStyleClass: "sapUiTinyMargin",
						press: function () {
							oDialog.open();
							jQuery.sap.delayedCall(500, this, function () {
								oModel.remove(sPath, {
									method: "DELETE",
									success: function (data) {
										oDialog.close();
										dialog.close();
										MessageToast.show("Vistoria deletado com sucesso!");
										oBinding.filter([]).sort([]);
									},
									error: function (e) {
										oDialog.close();
										dialog.close();
										MessageBox.error("Erro ao deletar o vistoria!");
									}
								});
							});
						}
					}),
					endButton: new Button({
						text: "Não",
						type: "Reject",
						icon: "sap-icon://negative",
						iconFirst: true,
						widht: "auto",
						enabled: true,
						visible: true,
						addStyleClass: "sapUiTinyMargin",
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function () {
						dialog.destroy();
					}
				});
				dialog.open();
			} else {
				// MessageBox.Warnig("Não é possivel fazer alterações nessa vistoria");
				MessageToast.show("Não é possivel fazer alterações nessa vistoria");
			}
			// this.onRefresh();
		},

		onFilter: function (onEvent) {
			this.createViewSettingsDialog("com.sap.build.standard.formInspecaoDeVeiculos.view.FilterDialog").open();
		},

		handleFilterDialogConfirm: function (oEvent) {
			var mParams = oEvent.getParameters(),
				filter = [],
				oSearch = this.getView().byId("idPesquisa"),
				query = this.sSearchQuery;
			mParams.filterItems.forEach(function (oItem) {
				var aSplit = oItem.getKey().split("-"),
					sPath = aSplit[0],
					sValue = aSplit[1];

				if (sPath == "Veiculo") {
					oSearch.setPlaceholder("Placa do Veiculo");
				}

				if (sPath == "Id") {
					oSearch.setPlaceholder("Nº da Vistoria");
				}

				if (sPath == "Nome") {
					oSearch.setPlaceholder("Nome do Motorista");
				}

				if (sPath !== "Status") {
					var oFilter = new Filter(sPath, sap.ui.model.FilterOperator.Contains, query);
				} else {
					var oFilter = new Filter(sPath, sap.ui.model.FilterOperator.Contains, sValue);
				}
				filter.push(oFilter);
			});
			this.aFilters = filter;
		},

		createViewSettingsDialog: function (sDialogFragmentName) {
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			return oDialog;
		},

		onSearch: function (evt) {
			this.sSearchQuery = evt.getSource().getValue().toUpperCase();
			this.aFilters[0].oValue1 = this.sSearchQuery;
			this.fnApplyFiltersAndOrdering();
		},

		fnApplyFiltersAndOrdering: function (oEvent) {
			this.byId("listaVistorias").getBinding("items").filter(this.aFilters).sort(this.aSorters);
		},

		onGroup: function (onEvent) {
			this.createViewSettingsDialog("com.sap.build.standard.formInspecaoDeVeiculos.view.GroupDialog").open();
		},

		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this.byId("listaVistorias"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];

			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, vGroup));
				oBinding.sort(aGroups);
			}
		},

		onSort: function (onEvent) {
			this.createViewSettingsDialog("com.sap.build.standard.formInspecaoDeVeiculos.view.SortDialog").open();
		},

		handleSortDialogConfirm: function (oEvent) {
			this.aSorters = [];
			var mParams = oEvent.getParameters(),
				sPath = mParams.sortItem.getKey(),
				bDescending = mParams.sortDescending;

			this.aSorters.push(new Sorter(sPath, bDescending));
			this.fnApplyFiltersAndOrdering();
		},

		onRefresh: function (onEvent) {
			this.iniciaVariaveis();
			this.fnApplyFiltersAndOrdering();
			this.getView().byId("idPesquisa").setPlaceholder("Placa do Veiculo");
		},

		iniciaVariaveis: function () {
			this.sSearchQuery = "";
			this.aFilters = [];
			this.aFilters.push(new Filter("Veiculo", sap.ui.model.FilterOperator.Contains, this.sSearchQuery));
			this.aFilters.push(new Filter("Status", sap.ui.model.FilterOperator.Contains, this.sSearchQuery));
			this.aSorters = [];
		},

		onExit: function () {
			var oDialogKey,
				oDialogValue;
			for (oDialogKey in this._mViewSettingsDialogs) {
				oDialogValue = this._mViewSettingsDialogs[oDialogKey];
				if (oDialogValue) {
					oDialogValue.destroy();
				}
			}
		},

		onInit: function () {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ListarVeiculos").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			this._mViewSettingsDialogs = {};

			this.bGrouped = false;
			this.bDescending = false;

			this.termoPesquisa = "Placa do veiculo";
			this.sSearchQuery = "";
			this.aFilters = [];
			this.aSorters = [];
			this.iniciaVariaveis();

			this.mGroupFunctions = {
				Status: function (oContext) {
					var name = oContext.getProperty("Status");
					return {
						key: name,
						text: name
					};
				},

				Nome: function (oContext) {
					var name = oContext.getProperty("Nome");
					return {
						key: name,
						text: name
					};
				},

				Veiculo: function (oContext) {
					var name = oContext.getProperty("Veiculo");
					return {
						key: name,
						text: name
					};
				},

				DataCarregamento: function (oContext) {
					var name = oContext.getProperty("DataCarregamento");
					return {
						key: name,
						text: name
					};
				}
			};
		}
	});
}, /* bExport= */ true);