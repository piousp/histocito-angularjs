"use strict";

module.exports = cisSelectorTipos;

function cisSelectorTipos() {
  return {
    replace: true,
    require: "ngModel",
    scope: {
      cargando: "="
    },
    link: link,
    restrict: "A",
    templateUrl: "procedimientos/directivas/selectortipos/plantilla.html",
    controller: "cisSelectorTiposCtrl as vm"
  };
} //function

function link( $scope, $elem, $attr, ngModelCtrl ) {
  $scope.$watch( "vm.modelo", watch );
  $scope.$watch( function() {
    return ngModelCtrl.$modelValue;
  }, watchNgModelCtrl );

  function watch( val ) {
    if ( _.isObject( val ) ) {
      ngModelCtrl.$setViewValue( val.id );
    } //if
  } //function

  function watchNgModelCtrl( val ) {
    if ( !_.isObject( val ) && /^[a-f0-9]{24}$/.test( val ) ) {
      $scope.vm.enSeleccion( val );
    }
  } //function
} //function
