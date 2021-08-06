import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Comercio } from '../models/comercio';
import { TurnosService } from "../services/turnos.service";
import { Constantes } from "../util/constantes";
import { NotificacionService } from "../util/notificacion.service";
import { ParametroComercio } from "../util/parametroComercio";

@Component({
  selector: "app-comercio",
  templateUrl: "./comercio.component.html",
  styleUrls: ["./comercio.component.scss"]
})
export class ComercioComponent implements OnInit {

  comercios: Comercio[] = [];
  regModel: Comercio;
  showNew: Boolean = false;
  submitType: string = "Guardar";
  selectedRow: number;
  form: any;

  constructor(private serviceTurnos: TurnosService,
    private cdref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private notificacion: NotificacionService,) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      nombreComercio: ['', Validators.required],
      aforoMaximo: ['', Validators.required]
    });
    this.consultarComercios();
  }

  get f(){
    return this.form.controls;
  }
  
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onNew() {
    this.regModel = new Comercio();
    this.submitType = 'Guardar';
    this.showNew = true;
  }

  async onSave() {
    if (this.submitType === 'Guardar') {
      debugger
      this.comercios.push(this.regModel);
      let params = new ParametroComercio();
      params.nombre_comercio = this.regModel['nombre_comercio'];
      params.aforo_maximo = this.regModel['aforo_maximo'];
      this.serviceTurnos.crearComercio(params).subscribe(
        response => {
          this.notificacion.changeAlertConfirmacion(response['nombre_comercio']);
          console.log(response);
        }
      )
    } else {
      // Update existing 
      this.comercios[this.selectedRow].idComercio = this.regModel.idComercio;
      this.comercios[this.selectedRow].nombreComercio = this.regModel.nombreComercio;
      this.comercios[this.selectedRow].aforoMaximo = this.regModel.aforoMaximo;

      //limpiar objeto a enviar
      delete this.regModel.idComercio;
      delete this.regModel.nombreComercio;
      delete this.regModel.aforoMaximo;
      this.serviceTurnos.actualizarComercio(this.regModel['id_comercio'], this.regModel).subscribe(
        response => {
          this.notificacion.changeAlertUpdate(this.regModel['nombre_comercio']);
          this.consultarComercios();
        },
        error => {
          console.log(error);
        }
      );
    }

    this.showNew = false;

  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.regModel = new Comercio();
    // Retrieve selected 
    this.regModel = Object.assign({}, this.comercios[this.selectedRow]);
    this.submitType = Constantes.LBL_ACTUALIZAR;
    this.showNew = true;
  }

  onDelete(index: number) {
    this.comercios.splice(index, 1);
  }

  onCancel() {
    this.showNew = false;
    this.form.reset();
  }

  consultarComercios() {
    this.serviceTurnos.listarComercios().subscribe(
      response => {
        this.comercios = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}

