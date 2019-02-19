sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, Utilities, History, JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.formInspecaoDeVeiculos.controller.Conclusao", {
		handleRouteMatched: function (oEvent) {
			var oParams = {};

			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			if (oStorage.get("Save").isSave) {
				if (oStorage.get("Reset").page3) {
					this.resetPage();
					oStorage.put("Reset", {
						page1: false,
						page2: false,
						page3: false
					});
				}
			}

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
				"resultadoRb"
			];
			this.handleRadioButtonGroupsSelectedIndex();

		},

		resetPage: function () {
			this.getView().byId("obsInput").setValue("");
			this.getView().byId("dataInput").setValue("");
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
				"resultadoRb"
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
		_onRadioButtonGroupSelect: function () {

		},

		handleLiveChange: function (oEvent) {
			var id = oEvent.getParameter("id").split("application-BUILD-prototype-component---Conclusao--");
			var input = this.getView().byId(id[1]);
			input.setValueState("None");
			input.setValue(input.getValue().toUpperCase());
		},

		// getODataDateFromDatePicker: function (datePickerInstance) {
		// 	var yyyymmdd = datePickerInstance.getValue();
		// 	var splitDateArray = yyyymmdd.match(/(\d{4})(\d{2})(\d{2})/);
		// 	var yyyySlashMMSlashDD = splitDateArray[1] + '/' + splitDateArray[2] + '/' + splitDateArray[3];
		// 	var jsDateObject = new Date(yyyySlashMMSlashDD);
		// 	return jsDateObject;
		// },

		_inputDados: function () {
			if (this.getView().byId("dataInput").getValue() !== "") {
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

				var identificacao = oStorage.get("identificacao"),
					inspecao = oStorage.get("inspecao");

				var dados = {
					// Mandt: "010",
					Id: "-1",

					Veiculo: identificacao.veiculo,
					Reboque1: identificacao.reboque1,
					Reboque2: identificacao.reboque2,
					Carroceria: inspecao.carroceria,

					Motorista: identificacao.lifnr,
					Nome: identificacao.nome_motorista,
					Cpf: identificacao.cpf,

					C1UltimaCarga: inspecao.ultimas_cargas.compartimento1.ulti_carga,
					C1PenultimaCarga: inspecao.ultimas_cargas.compartimento1.penu_carga,
					C1AntepeultCarga: inspecao.ultimas_cargas.compartimento1.ante_carga,
					C2UltimaCarga: inspecao.ultimas_cargas.compartimento2.ulti_carga,
					C2PenultimaCarga: inspecao.ultimas_cargas.compartimento2.penu_carga,
					C2AntepeultCarga: inspecao.ultimas_cargas.compartimento2.ante_carga,
					// Sopro com ar comprimido (A)
					C1SoproAr: inspecao.tipo_limpeza.tipo_limpeza_01.compartimento1,
					C2SoproAr: inspecao.tipo_limpeza.tipo_limpeza_01.compartimento2,
					// Varredura (A)
					C1Varredura: inspecao.tipo_limpeza.tipo_limpeza_02.compartimento1,
					C2Varredura: inspecao.tipo_limpeza.tipo_limpeza_02.compartimento2,
					// Lavagem com água (B)
					C1Lavagem: inspecao.tipo_limpeza.tipo_limpeza_03.compartimento1,
					C2Lavagem: inspecao.tipo_limpeza.tipo_limpeza_03.compartimento2,
					// Vaporização (com vapor d'água) (C)
					C1Vaporizacao: inspecao.tipo_limpeza.tipo_limpeza_04.compartimento1,
					C2Vaporizacao: inspecao.tipo_limpeza.tipo_limpeza_04.compartimento2,
					// Lavagem com água e agente de limpeza (C)
					C1Lavagem02: inspecao.tipo_limpeza.tipo_limpeza_05.compartimento1,
					C2Lavagem02: inspecao.tipo_limpeza.tipo_limpeza_05.compartimento2,
					// Lavagem com água e agente de desinfecção (D)
					C1Lavagem03: inspecao.tipo_limpeza.tipo_limpeza_06.compartimento1,
					C2Lavagem03: inspecao.tipo_limpeza.tipo_limpeza_06.compartimento2,

					CondicaoVeiculo01: inspecao.condicao_limpeza.condicoe01,
					CondicaoVeiculo02: inspecao.condicao_limpeza.condicoe02,
					CondicaoVeiculo03: inspecao.condicao_limpeza.condicoe03,
					CondicaoVeiculo04: inspecao.condicao_limpeza.condicoe04,
					CondicaoVeiculo05: inspecao.condicao_limpeza.condicoe05,
					CondicaoVeiculo06: inspecao.condicao_limpeza.condicoe06,
					CondicaoVeiculo07: inspecao.condicao_limpeza.condicoe07,
					CondicaoVeiculo08: inspecao.condicao_limpeza.condicoe08,
					CondicaoVeiculo09: inspecao.condicao_limpeza.condicoe09,
					CondicaoVeiculo10: inspecao.condicao_limpeza.condicoe10,
					CondicaoVeiculo11: inspecao.condicao_limpeza.condicoe11,
					CondicaoVeiculo12: inspecao.condicao_limpeza.condicoe12,
					CondicaoVeiculo13: inspecao.condicao_limpeza.condicoe13,

					Usuario: sap.ushell.Container.getUser().getFirstName(),

					// DataCriacao: this.getView().byId("dataInput").getProperty("dateValue"),
					// dataHora: "00:00:00",

					Status: "A",

					Resultado: this.getView().byId("resultadoRb").getSelectedIndex() === 0 ? true : false,
					DataCarregamento: this.getView().byId("dataInput").getProperty("dateValue"),
					Observacoes: this.getView().byId("obsInput").getValue()
						// Produtos: "123456789123456789"
				};

				var sUrl = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV";
				var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
				var rota = this.getOwnerComponent().getRouter();
				this.resetPage();
				var that = this;
				// this.onExit();

				//Chamando fragment
				var caminho = "com.sap.build.standard.formInspecaoDeVeiculos.view.BusyDialog";
				var oDialog = sap.ui.xmlfragment(caminho, this);
				oDialog.open();

				jQuery.sap.delayedCall(500, this, function () {

					oModel.create('/Vistoria', dados, null,
						function (oData, oResponse) {

							jQuery.each(inspecao.produtos.chaves, function (i, produto) {
								dados = {
									IdVistoria: oData.Id,
									IdProduto: produto
								};
								oModel.create("/AuxVistoria", dados, {
									success: function () {

									},
									error: function (oError) {

									}
								});
							});

							MessageBox.success('Cadastrado com sucesso!', {
								onClose: function (sActionClicked) {
									oDialog.close();
									oStorage.clear();
									oStorage.removeAll();
									oStorage.put("Save", {
										isSave: true
									});
									rota.navTo("Menu", false);
								}
							});
						},
						function () {
							oDialog.close();
							MessageBox.error('Erro ao cadastrar o veiculo!');
						}
					);

				});

				// oModel.create("/Vistoria", dados, {
				// 	success: function (oData, oResponse) {
				// 		// Success
				// 		// sap.m.MessageToast.show("Cadastrado com sucesso!");

				// 		// jQuery.each(inspecao.produtos.chaves, function (i, produto){
				// 		// 	oData.id
				// 		// });
				// 		// this.salvaProdutos(this.inspecao.produtos.chaves, oData.id);
				// 		// var teste =  this.inspecao.produtos.chaves;
				// 		// return oData.id;
				// 	},
				// 	error: function (oError) {

				// 		// Error
				// 		sap.m.MessageToast.show("Erro ao cadastrar o veiculo!");
				// 		// return null;
				// 	}
				// });

			} else {
				MessageBox.warning("É Necessário definir uma data para salvar.");
			}
			
			
		},
		
		// onExit: function(){
		// 	this.getView().destroy(true);	
		// },

		salvaProdutos: function (produtos, id) {
			var sUrl = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			for (var i = 0; i < produtos.length; i++) {
				var dados = {
					IdVistoria: id,
					IdProduto: produtos[i]
				};
				oModel.create("/AuxVistoria", dados, {
					success: function (oData, oResponse) {

					},
					error: function (oError) {

						// sap.m.MessageToast.show("Erro ao cadastrar o veiculo!");
					}
				});
			}
		},

		_data: {
			"date": new Date()
		},

		onInit: function () {
			var oModel = new JSONModel(this._data);
			this.getView().setModel(oModel);
		}
	});
}, /* bExport= */ true);;