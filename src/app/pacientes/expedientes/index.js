"use strict";

var modulo = angular.module( "Proyecto.expedientes", [
  require( "./directivas/datosexpediente" ),
  require( "./directivas/muestrasexpediente" )
] );

modulo.config( require( "./rutas.js" ) );

modulo.controller( "FormExpedienteCtrl", require( "./ctrls/formExpedienteCtrl.js" ) );
modulo.controller( "ListaExpedienteCtrl", require( "./ctrls/listaExpedienteCtrl.js" ) );
modulo.controller( "PatronCedula", require( "./ctrls/patronCedula.js" ) );
modulo.controller( "DuplicadosCtrl", require( "./ctrls/duplicadosCtrl.js" ) );

modulo.directive( "cisBuscadorExpedientes", require( "./directivas/cisBuscadorExpedientes.js" ) );

modulo.factory( "ExpedientesTabs", require( "./servicios/expedientesTabs.js" ) );
modulo.factory( "Expedientes", require( "./servicios/expendientes.js" ) );
modulo.factory( "ExpedientesREST", require( "./ctrls/rest/expedientesAPI.js" ) );

module.exports = modulo.name;
