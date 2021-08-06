import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from '../util/constantes';
import { PathUtil } from '../util/path-util';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService extends GeneralService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
 }

 /**
  * Generar Turnos
  * @param parameters 
  * @returns 
  */
 public generarTurnos(parameters: any): Observable<any> {
  let path:string = PathUtil.getPathParams(parameters);
  let url = environment.generarTurnos;
  console.log(url+path);
  
  return super.get(url+path,)
}

/**
 * Consultar turnos generados
 * @param id 
 * @returns 
 */
  public consultarTurnos(id: Number): Observable<any> {
    let url = environment.consultarTurnos+id
    return super.get(url)
  }

  /**
   * Crear comercio
   * @param parameters 
   * @returns 
   */
  public crearComercio(parameters: any): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    const params = new HttpParams()
      .set(Constantes.NOMBRE_COMERCIO,parameters.nombre_comercio,)
      .set(Constantes.AFORO_MAXIMO,parameters.aforo_maximo);
      const body=JSON.stringify(parameters);
    let url = super.post(environment.crearComercio,body,{'headers':headers,'params':parameters})
    return url;
  }

  /**
   * Crear Servicio
   * @param parameters 
   * @returns 
   */
  public crearServicio(parameters: any): Observable<any> {
    debugger
    const headers = { 'content-type': 'application/json'} 
    const params = new HttpParams()
      .set(Constantes.NOMBRE_SERVICIO,parameters.nombre_servicio,)
      .set(Constantes.HORA_APERTURA,parameters.hora_apertura)
      .set(Constantes.HORA_CIERRE,parameters.hora_cierre)
      .set(Constantes.DURACION,parameters.duracion)
      .set(Constantes.ID_COMERCIO,parameters.id_comercio);
      const body=JSON.stringify(parameters);
    let url = super.post(environment.crearServicio,body,{'headers':headers,'params':parameters})
    return url;
  }

  /**
   * Actualizar comercio
   * @param params 
   */
   public actualizarComercio(id: Number, comercio: any): Observable<any> {
    let url = environment.editarComercio+environment.slash + id
    
    return super.put(url, comercio)
  }

  /**
   * Actualizar servicio
   * @param params 
   */
   public actualizarServicio(id: Number, servicio: any): Observable<any> {
    let url = environment.editarServicio+environment.slash + id
    
    return super.put(url, servicio)
  }

  /**
   * Listar Turnos
   * @param parameters 
   * @returns 
   */
  public listarTurnos(parameters: any): Observable<any> {
    let path:string = PathUtil.getPathParams(parameters);
    let url = environment.consultarTurnos;
    return super.get(url+path,)
  }

  /**
   * Listar Servicios
   * @returns 
   */
  public listarServicios(): Observable<any> {
    let url = environment.consultarServicios;
    return super.get(url);
  }

  /**
   * Listar Comercios
   * @returns 
   */
  public listarComercios(): Observable<any> {
    let url = environment.consultarComercios;
    return super.get(url);
  }

  /**
   * Validar turnos existentes.
   * @param parameters 
   */
  public buscarTurnoGenerado(parameters:any): Observable<any>{
    let path:string = PathUtil.getPathParams(parameters);
    let url = environment.validarTurnos;
    return super.get(url+path,)
  }

  /**
   * Reservar turnos
   * @param idTurno 
   * @param turno 
   * @returns 
   */
  public reservarTurno(idTurno:number, turno:any): Observable<any>{
    let url = environment.reservarTurno + environment.slash + idTurno
    console.log(url, turno);
    return super.put(url, turno)
  }

  /**
   * Cancelar reserva turno
   * @param idTurno 
   * @param turno 
   * @returns 
   */
  public cancelarReservarTurno(idTurno:number, turno:any): Observable<any>{
    let url = environment.reservarTurno + environment.slash + idTurno
    console.log(url, turno);
    return super.put(url, turno)
  }
}
