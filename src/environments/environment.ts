// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var urlBase = 'http://localhost:8090/api';
export const environment = {
  slash: '/',
  production: false,
  consultarTurnos : urlBase+'/turnos',
  consultarServicios : urlBase+'/servicios',
  consultarComercios : urlBase+'/comercios',
  generarTurnos : urlBase+'/generarTurnos',
  crearServicio : urlBase+'/crearservicio',
  crearComercio : urlBase+'/crearcomercio',
  editarServicio : urlBase+'/editarservicio',
  editarComercio : urlBase+'/editarcomercio',
  eliminarServicio : urlBase+'/eliminarservicio',
  eliminarComercio : urlBase+'/eliminarcomercio',
  validarTurnos : urlBase+'/validarturnos',
  reservarTurno : urlBase+'/reservarturno',
  cancelarReservarTurno : urlBase+'/cancelareservaturno',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
