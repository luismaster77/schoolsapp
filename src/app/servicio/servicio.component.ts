import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Comercio } from "../models/comercio";
import { Servicio } from '../models/servicio';
import { TurnosService } from "../services/turnos.service";
import { ParametroServicio } from "../util/parametroServicio";
import * as moment from 'moment';
import { FormBuilder, Validators } from "@angular/forms";
import { transition, style, animate, trigger } from '@angular/animations';
import { Constantes } from "../util/constantes";
import { NotificacionService } from "../util/notificacion.service";
import { FormatDateService } from "../util/format-date.service";


const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);


@Component({
  selector: "app-servicio",
  templateUrl: "./servicio.component.html",
  styleUrls: ["./servicio.component.scss"],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class ServicioComponent implements OnInit {
  servicios: Servicio[] = [];
  comercios = [{
      id_comercio: null,
      nombre_comercio : 'Seleccione un comercio',
      aforo_maximo : null,
  }];
  regModel: Servicio;
  regModelServicio: Servicio;
  showNew: Boolean = false;
  submitType: string = Constantes.LBL_GUARDAR;
  selectedRow: number;
  dataServicio: any;
  seleccionado: any;
  dateApertura: any;
  dateCierre: any;
  form:any;
  alertaMessage:string= Constantes.MENSAJE_VALIDACION_FECHAS;
  validate:boolean=false;
  idComercio:any;
  nombreComercio:any;
  ngModelSelect:any=null;

  //minimo fecha
  todaydate:any;
  //minino hora
  timeday:any;
  id:number = 0;

  constructor(private serviceTurnos: TurnosService,
    private cdref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private formatDate: FormatDateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombreServicio: ['', Validators.required],
      fechaApertura: ['', Validators.required],
      horaApertura: ['', Validators.required],
      fechaCierre: ['', Validators.required],
      horaCierre: ['', Validators.required],
      duracion: ['', Validators.required],
      comercio: ['', Validators.required],
    });
    this.consultarServicio();
    this.consultarComercio();
    this.todaydate = this.formatDate.getFormatFecha(new Date());
    this.timeday = this.formatDate.getTime24H(new Date());
  }

  get f(){
    return this.form.controls;
  }
  
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onNew() {
    this.regModel = new Servicio();
    this.submitType = Constantes.LBL_GUARDAR;
    this.showNew = true;
  }

  async onSave() {
    if (this.submitType === Constantes.LBL_GUARDAR) {
      this.servicios.push(this.regModel);
      let params = new ParametroServicio();
      params.nombre_servicio = this.regModel['nombre_servicio'];
      params.hora_apertura = this.regModel['hora_apertura'] + ' ' + this.regModel['horaApertura1'];
      params.hora_cierre = this.regModel['hora_cierre'] + ' ' + this.regModel['horaCierre1'];
      params.duracion = this.regModel['duracion'];
      params.id_comercio = this.ngModelSelect;
      this.serviceTurnos.crearServicio(params).subscribe(
        response => {
          this.consultarServicio();
            this.notificacionService.changeAlertConfirmacion(response['nombre_servicio']);
        },
        error => {
          console.log(error);
        }        
      )
    } else {

      //limpiar objeto a enviar
      delete this.regModel['id_comercio'];
      this.regModel['id_comercio'] = this.ngModelSelect;
      this.regModel['hora_apertura'] = this.regModel['hora_apertura']+' ' + this.regModel['horaApertura1'];
      this.regModel['hora_cierre'] = this.regModel['hora_cierre']+' ' + this.regModel['horaCierre1'];
      
      delete this.regModel['horaApertura1'];
      delete this.regModel['horaCierre1'];
      delete this.regModel['nombre_comercio'];
      delete this.regModel['aforo_maximo'];
      delete this.regModel['comercio'];

      this.serviceTurnos.actualizarServicio(this.regModel['id_servicio'], this.regModel).subscribe(
        response => {
          this.notificacionService.changeAlertUpdate('Servicio');
          this.consultarServicio();
        },
        error => {
          console.log(error);
        }
      );
    }

    this.showNew = false;
    this.form.reset();
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.regModel = new Servicio();

    this.regModelServicio = Object.assign({}, this.servicios[this.selectedRow]);

    this.ngModelSelect = this.regModelServicio['id_comercio'][0];
    let fechaApertura = this.formatDate.getFormatFecha(this.regModelServicio['hora_apertura']);
    let fechaCierre = this.formatDate.getFormatFecha(this.regModelServicio['hora_cierre']);
    let horaApertura:any = this.formatDate.getTime24H2(this.regModelServicio['hora_apertura']);
    let horaCierre:any = this.formatDate.getTime24H2(this.regModelServicio['hora_cierre']);

    this.regModelServicio['hora_apertura'] = fechaApertura;
    this.regModelServicio['hora_cierre'] = fechaCierre;
    this.regModelServicio['horaApertura1'] = horaApertura;
    this.regModelServicio['horaCierre1'] = horaCierre;
    this.regModelServicio['id_comercio'] = this.ngModelSelect;
    this.regModel = this.regModelServicio;
    this.submitType = Constantes.LBL_ACTUALIZAR;
    this.showNew = true;
  }

  onDelete(index: number) {
    this.servicios.splice(index, 1);
  }

  onCancel() {
    this.showNew = false;
    this.form.reset();

  }
  
  onChangeComercio(event: any) {
    const value = event;
    this.ngModelSelect = value;
  }
  
  async consultarServicio() {
    this.serviceTurnos.listarServicios().subscribe(
      response => {
        this.servicios = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  consultarComercio() {
    this.serviceTurnos.listarComercios().subscribe(
      response => {
        this.comercios = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  onchange(event: any){
    if(this.regModel['hora_apertura'] != null){
      this.form.controls['fechaCierre'].enable();
    }
    if(this.regModel['hora_cierre']!=null && this.regModel['hora_cierre'] < this.regModel['hora_apertura']){
      this.regModel['hora_cierre'] = null;
      this.validate = true;
      setTimeout(()=>{this.alert(false)}, 4000);
    }
  }

  alert(alert: any) {
    this.validate = alert;
  }
}
