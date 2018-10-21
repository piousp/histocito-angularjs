"use strict";

module.exports = PremuestraModalCtrl;

var map = require( "lodash/collection/map" );
var get = require( "lodash/object/get" );

PremuestraModalCtrl.$inject = [
  "$scope",
  "solicitudes",
  "$modalInstance",
  "SolicitudAPI",
  "Procedimientos",
  "Muestras",
  "MuestrasREST",
  "Usuarios",
  "Alertas"
];
function PremuestraModalCtrl(
  $scope,
  solicitudes,
  $modalInstance,
  SolicitudAPI,
  Procedimientos,
  Muestras,
  MuestrasREST,
  Usuarios,
  Alertas
) {
  $scope.cancelar = cancelar;
  $scope.solicitudes = solicitudes;
  $scope.actual = {};
  $scope.i = 0;
  $scope.cargarPremuestra = cargarPremuestra;
  $scope.buscarItem = buscarItem;
  $scope.buscarUsuarios = buscarUsuarios;
  $scope.convertir = convertir;
  $scope.convirtiendo = false;
  $scope.getCorreos = getCorreos;
  $scope.mapBuscador = {
    "procedimiento": Procedimientos.procedimientos.buscar,
    "medico": Muestras.buscarMedicos,
    "clinica": Muestras.buscarClinicas
  };

  cargarPremuestra( solicitudes[$scope.i] );

  function cargarPremuestra( solicitud ) {
    return SolicitudAPI
      .preconvertir( solicitud )
      .then( function( resp ) {
        $scope.actual = resp;
      } );
  }

  function buscarItem( valor, item ) {
    return $scope.mapBuscador[item]( 0, 10, valor ).then( ok, error );
  }

  function buscarUsuarios( texto, tipo ) {
    var dim = [ {
      tipoUsuario: [ tipo ]
    } ];
    return Usuarios.buscar( 0, 10, texto, dim ).then( ok, error );
  }

  function parsearMuestra( data ) {
    return {
      autorizados: data.relacion.autorizados || [],
      cobrada: false,
      consecutivo: data.consecutivo.display,
      correos: getCorreos( data.paciente ),
      enviada: false,
      equipo: {
        histotecnologo: data.relacion.histotecnologo._id,
        citotecnologo: data.relacion.citotecnologo._id,
        patologo: data.relacion.patologo._id
      },
      estado: "Registrada",
      fechaToma: data.fechaToma,
      idClinica: data.relacion.clinica._id,
      idExpediente: data.paciente,
      idMedico: data.relacion.medico._id,
      idProcedimiento: data.procedimiento._id,
      idUsuario: data.relacion.dueno._id,
      idSolicitud: data._id,
      imagenes: [],
      numero: data.consecutivo.numero,
      template: data.plantilla
    };
  }

  function getCorreos( paciente ) {
    if ( paciente._id ) {
      return map( get( paciente.ficha, "datosContacto.correos", [] ), "correo" );
    }
    return paciente.correos || [];
  }

  function convertir( pre, form ) {
    $scope.$emit( "show-errors-check-validity" );
    if ( form.$valid ) {
      $scope.convirtiendo = true;
      var muestra = parsearMuestra( pre );
      return SolicitudAPI.convertir( muestra )
        .then( cargarSiguiente )
        .catch( errorConvertir )
        .finally( terminarConvertir );
    }
  }

  function cargarSiguiente() {
    $scope.i += 1;
    if ( $scope.i < $scope.solicitudes.length ) {
      return cargarPremuestra( $scope.solicitudes[$scope.i] );
    }
    return $modalInstance.close();
  }

  function errorConvertir( err ) {
    Alertas.agregar( err.status, "Hubo un error al convertir la solicitud en muestra" );
  }

  function terminarConvertir() {
    $scope.convirtiendo = false;
  }

  function ok( resp ) {
    return resp.data.lista;
  }

  function error() {
    return [];
  }

  function cancelar() {
    $scope.$emit( "show-errors-reset" );
    $modalInstance.dismiss();
  }
}
