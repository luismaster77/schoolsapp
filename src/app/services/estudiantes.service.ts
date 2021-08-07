import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  estudianteList : AngularFireList<any>;
  selectedEstudiante : Estudiante = new Estudiante();
  constructor(private firebase : AngularFireDatabase) { }

  getEstudiantes(){
    return this.estudianteList = this.firebase.list('/estudiantes');
 }

 guardarEstudiante(estudiante: Estudiante){
   console.log(estudiante);
   
  this.estudianteList = this.firebase.list('/estudiantes');
    this.estudianteList.push({
      nombres: estudiante.nombresEstudiante,
      apellidos: estudiante.apellidosEstudiante
  })
 }

 actualizarEstudiante(estudiante: Estudiante){
    this.estudianteList.update(estudiante['key'],{
      nombres: estudiante.nombresEstudiante,
      apellidos: estudiante.apellidosEstudiante
    })
 }

 eliminarEstudiante($key: string){
    this.estudianteList.remove($key);
 }
}
