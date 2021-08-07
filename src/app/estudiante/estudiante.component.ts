import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../models/estudiante';
import { EstudiantesService } from '../services/estudiantes.service';
import { Constantes } from '../util/constantes';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  form: any;
  estudiantesList:Estudiante[];
  submitType: string = Constantes.LBL_GUARDAR;
  selectedRow: number;
  showNew: Boolean = false;
  
  constructor(private estudianteService: EstudiantesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombresEstudiante: ['', Validators.required],
      apellidosEstudiante: ['', Validators.required],
      key:[],
    });
    this.estudianteService.getEstudiantes()
    .snapshotChanges()
    .subscribe(item => {
      console.log(item);
      
      this.estudiantesList = [];
      item.forEach(element => {
        let id = element.payload.toJSON();
        console.log(id);
        
        id['$key'] = element.key;
        this.estudiantesList.push(id as Estudiante);
      });
    })
  }
  get f(){
    return this.form.controls;
  }

  onNew() {
    this.submitType = Constantes.LBL_GUARDAR;
    this.showNew = true;
  }

  onSave(formEstudiante : NgForm) {
    if(formEstudiante.value.key == null){
      this.estudianteService.guardarEstudiante(formEstudiante.value);
    }else{
      this.estudianteService.actualizarEstudiante(formEstudiante.value);
    }
      this.onCancel();
  }

  onEdit(estudiante: Estudiante) {
    // Retrieve selected 
    this.estudianteService.selectedEstudiante = Object.assign({},estudiante);

    this.submitType = Constantes.LBL_ACTUALIZAR;
    this.showNew = true;
  }

  onDelete(key : string){
    this.estudianteService.eliminarEstudiante(key);
    this.toastr.success('Operación exitosa','Estudiante eliminado');
  }

  onCancel() {
    this.showNew = false;
    this.form.reset();
    this.estudianteService.selectedEstudiante = new Estudiante();
  }

}
