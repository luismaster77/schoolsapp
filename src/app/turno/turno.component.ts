import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { Servicio } from "../models/servicio";
import { Turno } from '../models/turno';
import { TurnosService } from "../services/turnos.service";
import { Constantes } from "../util/constantes";
import { FormatDateService } from "../util/format-date.service";
import { NotificacionService } from "../util/notificacion.service";
import { Parametros } from "../util/parametros";

@Component({
  selector: "app-turno",
  templateUrl: "./turno.component.html",
  styleUrls: ["./turno.component.scss"]
})
export class TurnoComponent implements OnInit {
    turnos: Turno[] = [];
    totalServicios :any[] = [];
    servicios2: any[] = [];
    regModel: Turno;
    regModelServicio : Servicio;

    seleccionado:any;
    servicios: any;
    dataServicio:any;

    selectedRow: number;
    fechaInicio:string;
    fechaFinal:string;

    showNew: Boolean = false;

  constructor(
    private serviceTurnos: TurnosService,
    private notification: NotificacionService,
    private formatDate : FormatDateService,) { }

  ngOnInit() {
    this.regModel = new Turno();
    this.consultarServicios();
    this.consultar(true);
  }

  onChangeServicio(servicio: string, dServicio:any) {
    if(dServicio!=null || dServicio!= undefined){
      this.dataServicio = dServicio;
      this.fechaInicio = this.formatDate.getFormatFecha24H(dServicio['hora_apertura']);
      this.fechaFinal = this.formatDate.getFormatFecha24H(dServicio['hora_cierre'])
    }
    this.seleccionado = dServicio.id_servicio;
    this.regModel.servicio = servicio;
  }

  consultarServicios(){
    this.serviceTurnos.listarServicios().subscribe(
      response => {      
        this.servicios = response;
        this.totalServicios = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  async generarTurnos() {

    let params = new Parametros();
    params.fechaInicio = this.formatDate.getFormatFecha24H(this.fechaInicio);
    params.fechaFin = this.formatDate.getFormatFecha24H(this.fechaFinal);
    params.idServicio = this.seleccionado;

    this.serviceTurnos.buscarTurnoGenerado(params).subscribe(
      response => {
        if(response == 0){
          this.serviceTurnos.generarTurnos(params).subscribe(
            response => {
              this.consultar(true);
              this.notification.changeAlertConfirmacion('Turno');
            },
            error => {
              console.log(error);
            }
          );
        }else{
          this.notification.showWarningAlert();
        }
    });
  }
  
  consultar(initPage: boolean) {
    let params = new Parametros();
    this.serviceTurnos.listarTurnos(params).subscribe(
      response => {
          this.turnos = response; 
      },
      error => {
        console.log(error);
      }
    );
  }
  
  onReservar(index: number){
    this.selectedRow = index;
    this.regModel = new Turno();
    this.regModel = Object.assign({}, this.turnos[this.selectedRow]);
    this.regModel['estado'] = Constantes.RESERVADO;
    this.serviceTurnos.reservarTurno(this.regModel['id_turno'],this.regModel).subscribe(response => {
        this.consultar(true);
        this.notification.showSuccessAlert();
    })
  }

  onCancelarReservar(index: number){
    this.selectedRow = index;
    this.regModel = new Turno();
    this.regModel = Object.assign({}, this.turnos[this.selectedRow]);
    this.regModel['estado'] = Constantes.DISPONIBLE;
    this.serviceTurnos.cancelarReservarTurno(this.regModel['id_turno'],this.regModel).subscribe(response => {
        this.consultar(true);
        this.notification.showSuccessAlertCancel();
    })
  }
}

