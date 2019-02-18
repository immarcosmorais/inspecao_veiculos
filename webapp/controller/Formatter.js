sap.ui.define(function() {
	"use strict";

	var Formatter = {

		infoState :  function (status) {
			if(status === "A"){
				return "Warning";
			}else if(status === "C"){
				return "Success";
			}else if(status === "E"){
				return "Error";
			}else{
				return "Information";
			}
		},
		
		info: function(status){
			if(status === "A"){
				return "Em Aberto";
			}else if(status === "C"){
				return "Concluido";
			}else if(status === "E"){
				return "Extornado";
			}else{
				return "None";
			}
		},
		
		selected: function(status){
			return status === "A" ? true : false;
		}, 
		
		icon: function(status){
			if(status === "A"){
				return "sap-icon://warning";
			}else if(status === "C"){
				return "sap-icon://message-success";
			}else if(status === "E"){
				return "sap-icon://undo";
			}else{
				return "None";
			}
		}
		
	};

	return Formatter;

}, /* bExport= */ true);