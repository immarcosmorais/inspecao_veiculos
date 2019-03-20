sap.ui.define(function () {
	"use strict";

	var Formatter = {

		infoState: function (status) {
			if (status === "A") {
				return "Warning";
			} else if (status === "C") {
				return "Success";
			} else if (status === "E") {
				return "Error";
			} else {
				return "Information";
			}
		},

		info: function (status) {
			if (status === "A") {
				return "Em Aberto";
			} else if (status === "C") {
				return "Concluido";
			} else if (status === "E") {
				return "Extornado";
			} else {
				return "None";
			}
		},

		color: function (status) {
			if (status === "A") {
				return "#e78c07";
			} else if (status === "C") {
				return "#2b7c2b";
			} else if (status === "E") {
				return "#bb0000";
			} else {
				return "#ffffff";
			}
		},

		// converteData: function (datePickerInstance) {
		// 	if (datePickerInstance !== null) {
		// 		var data = datePickerInstance.split('(')[1].split(')')[0];
		// 		data = data.substring(0, data.length - 3);
		// 		var int = parseInt(data);
		// 		var jsDateObject = new Date(int * 1000);
				
		// 		// return jsDateObject;

		// 		var dia = jsDateObject.getDate().toString(),
		// 			diaF = (dia.length == 1) ? '0' + dia : dia,
		// 			mes = (jsDateObject.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
		// 			mesF = (mes.length == 1) ? '0' + mes : mes,
		// 			anoF = jsDateObject.getFullYear();
		// 		return diaF + "/" + mesF + "/" + anoF;

		// 	} else {
		// 		return "Invalide";
		// 	}
		// },

		dataAtualFormatada: function (data) {
			data.setTime(data.getTime() + (3*60*60*1000)); 
			var dia = data.getDate().toString(),
				diaF = (dia.length == 1) ? '0' + dia : dia,
				mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
				mesF = (mes.length == 1) ? '0' + mes : mes,
				anoF = data.getFullYear();
			return diaF + "/" + mesF + "/" + anoF;
		},

		// retornaFormatoData: function (algumaCoisa) {
		// 	var formatoData = new sap.ui.model.type.Date({
		// 		source: {
		// 			pattern: "yyyy-MM-ddT00:00:00"
		// 		},
		// 		style: "short"
		// 	});
		// 	return formatoData;
		// },

		selected: function (status) {
			return status === "A" ? true : false;
		},

		blocked: function (status) {
			return status === "A" ? false : true;
		},

		icon: function (status) {
			if (status === "A") {
				return "sap-icon://warning";
			} else if (status === "C") {
				return "sap-icon://message-success";
			} else if (status === "E") {
				return "sap-icon://undo";
			} else {
				return "sap-icon://error";
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);