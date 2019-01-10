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

		getODataDateFromDatePicker: function (datePickerInstance) {
			var yyyymmdd = datePickerInstance.getValue();
			var splitDateArray = yyyymmdd.match(/(\d{4})(\d{2})(\d{2})/);
			var yyyySlashMMSlashDD = splitDateArray[1] + '/' + splitDateArray[2] + '/' + splitDateArray[3];
			var jsDateObject = new Date(yyyySlashMMSlashDD);
			return jsDateObject;
		},

		_inputDados: function () {
			if (this.getView().byId("dataInput").getValue() !== "") {
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

				var identificacao = oStorage.get("identificacao"),
					inspecao = oStorage.get("inspecao");

				var dados = {
					Cod: "-1",
					Veiculo: identificacao.veiculo,
					Reboque1: identificacao.reboque1,
					Reboque2: identificacao.reboque2,
					NomeMotorista: identificacao.nome_motorista,
					Cpf: identificacao.cpf,
					Carroceria: inspecao.carroceria,
					C1ulticarga: inspecao.ultimas_cargas.compartimento1.ulti_carga,
					C1penucarga: inspecao.ultimas_cargas.compartimento1.penu_carga,
					C1antecarga: inspecao.ultimas_cargas.compartimento1.ante_carga,
					C2ulticarga: inspecao.ultimas_cargas.compartimento2.ulti_carga,
					C2penucarga: inspecao.ultimas_cargas.compartimento2.penu_carga,
					C2antecarga: inspecao.ultimas_cargas.compartimento2.ante_carga,
					// Sopro com ar comprimido (A)
					C1soproar: inspecao.tipo_limpeza.tipo_limpeza_01.compartimento1,
					C2soproar: inspecao.tipo_limpeza.tipo_limpeza_01.compartimento2,
					// Varredura (A)
					C1varredura: inspecao.tipo_limpeza.tipo_limpeza_02.compartimento1,
					C2varredura: inspecao.tipo_limpeza.tipo_limpeza_02.compartimento2,
					// Lavagem com água (B)
					C1lavagem: inspecao.tipo_limpeza.tipo_limpeza_03.compartimento1,
					C2lavagem: inspecao.tipo_limpeza.tipo_limpeza_03.compartimento2,
					// Vaporização (com vapor d'água) (C)
					C1vaporizacao: inspecao.tipo_limpeza.tipo_limpeza_04.compartimento1,
					C2vaporizacao: inspecao.tipo_limpeza.tipo_limpeza_04.compartimento2,
					// Lavagem com água e agente de limpeza (C)
					C1lavagem01: inspecao.tipo_limpeza.tipo_limpeza_05.compartimento1,
					C2lavagem01: inspecao.tipo_limpeza.tipo_limpeza_05.compartimento2,
					// Lavagem com água e agente de desinfecção (D)
					C1lavagem02: inspecao.tipo_limpeza.tipo_limpeza_06.compartimento1,
					C2lavagem02: inspecao.tipo_limpeza.tipo_limpeza_06.compartimento2,

					Condvei01: inspecao.condicao_limpeza.condicoe01,
					Condvei02: inspecao.condicao_limpeza.condicoe02,
					Condvei03: inspecao.condicao_limpeza.condicoe03,
					Condvei04: inspecao.condicao_limpeza.condicoe04,
					Condvei05: inspecao.condicao_limpeza.condicoe05,
					Condvei06: inspecao.condicao_limpeza.condicoe06,
					Condvei07: inspecao.condicao_limpeza.condicoe07,
					Condvei08: inspecao.condicao_limpeza.condicoe08,
					Condvei09: inspecao.condicao_limpeza.condicoe09,
					Condvei10: inspecao.condicao_limpeza.condicoe10,
					Condvei11: inspecao.condicao_limpeza.condicoe11,
					Condvei12: inspecao.condicao_limpeza.condicoe12,
					Condvei13: inspecao.condicao_limpeza.condicoe13,

					Resultado: this.getView().byId("resultadoRb").getSelectedIndex() === 0 ? true : false,
					Datacarrega: this.getView().byId("dataInput").getProperty("dateValue"),
					Obs: this.getView().byId("obsInput").getValue(),
					Produtos: "123456789123456789"
				};

				// var dados = {
				// Cod: "-1",
				// Veiculo: oStorage.get("identificacao").veiculo,
				// Reboque1: oStorage.get("identificacao").reboque1,
				// Reboque2: oStorage.get("identificacao").reboque2,
				// NomeMotorista: oStorage.get("identificacao").nome_motorista,
				// Cpf: oStorage.get("identificacao").cpf,
				// Carroceria: oStorage.get("inspecao").carroceria,
				// C1ulticarga: oStorage.get("inspecao").ultima_cargas.compartimento1.ulti_carga,

				// C1penucarga: oStorage.get("inspecao").ultima_cargas.compartimento1.penu_carga,
				// C1antecarga: oStorage.get("inspecao").ultima_cargas.compartimento1.ante_carga,
				// C2ulticarga: oStorage.get("inspecao").ultima_cargas.compartimento2.ulti_carga,
				// C2penucarga: oStorage.get("inspecao").ultima_cargas.compartimento2.penu_carga,
				// C2antecarga: oStorage.get("inspecao").ultima_cargas.compartimento2.ante_carga,
				// C1soproar: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_01.compartimento1,
				// C2soproar: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_01.compartimento2,
				// C1varredura: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_02.compartimento1,
				// C2varredura: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_02.compartimento2,
				// C1lavagem: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_03.compartimento1,
				// C2lavagem: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_03.compartimento2,
				// C1vaporizacao: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_04.compartimento1,
				// C2vaporizacao: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_04.compartimento2,
				// C1lavagem01: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_05.compartimento1,
				// C2lavagem01: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_05.compartimento2,
				// C1lavagem02: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_06.compartimento1,
				// C2lavagem02: oStorage.get("inspecao").tipo_limpeza.tipo_limpeza_06.compartimento2,
				// Condvei01: oStorage.get("inspecao").condicao_limpeza.condicoe01,
				// Condvei02: oStorage.get("inspecao").condicao_limpeza.condicoe02,
				// Condvei03: oStorage.get("inspecao").condicao_limpeza.condicoe03,
				// Condvei04: oStorage.get("inspecao").condicao_limpeza.condicoe04,
				// Condvei05: oStorage.get("inspecao").condicao_limpeza.condicoe05,
				// Condvei06: oStorage.get("inspecao").condicao_limpeza.condicoe06,
				// Condvei07: oStorage.get("inspecao").condicao_limpeza.condicoe07,
				// Condvei08: oStorage.get("inspecao").condicao_limpeza.condicoe08,
				// Condvei09: oStorage.get("inspecao").condicao_limpeza.condicoe09,
				// Condvei10: oStorage.get("inspecao").condicao_limpeza.condicoe10,
				// Condvei11: oStorage.get("inspecao").condicao_limpeza.condicoe11,
				// Condvei12: oStorage.get("inspecao").condicao_limpeza.condicoe12,
				// Condvei13: oStorage.get("inspecao").condicao_limpeza.condicoe13,
				// Resultado: this.getView().byId("resultadoRb").getSelectedButton().getText(),
				// Datacarrega: this.getView().byId("dataInput").getValue(),
				// Obs: this.getView().byId("obsInput").getValue(),
				// Produtos: "t"
				// };

				var sUrl = "/sap/opu/odata/sap/ZGW_VISTORIA_SRV";
				var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
				var rota = this.getOwnerComponent().getRouter();
				this.resetPage();

				oModel.create('/Vistoria', dados, null,
					function () {
						MessageBox.success('Cadastrado com sucesso!', {
							onClose: function (sActionClicked) {
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
						MessageBox.error('Erro ao cadastrar o veiculo!');
					}
				);
			} else {
				MessageBox.warning("É Necessário definir uma data para salvar.");
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