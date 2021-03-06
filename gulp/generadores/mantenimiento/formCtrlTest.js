"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de FormNOMBRECtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
    it( "Debería estar siendo editado", angular.mock.inject( edicion ) );
    it( "No Debería estar siendo editado", angular.mock.inject( ver ) );
  } );

} );

function asignarValor( $controller ) {
  var valor = {nombre: "Prueba"};
  var ctrl = $controller( "FormNOMBRECtrl", {ARCHIVO: valor } );
  expect( ctrl.ARCHIVO.nombre ).toEqual( valor.nombre );
  expect( ctrl.ARCHIVO.editando ).toEqual( false );
}

function edicion( $controller ) {
  var ctrl = $controller( "FormNOMBRECtrl", {ARCHIVO: {}, $stateParams: {editar: "true"}} );
  expect( ctrl.ARCHIVO.editando ).toEqual( true );
}

function ver( $controller ) {
  var ctrl = $controller( "FormNOMBRECtrl", {ARCHIVO: {}, $stateParams: {editar: "false"}} );
  expect( ctrl.ARCHIVO.editando ).toEqual( false );
}
