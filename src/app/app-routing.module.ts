import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { HomeComponent } from './home/home.component';
import { ServicioComponent } from './servicio/servicio.component';
import { TurnoComponent } from './turno/turno.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'gestionarEstudiante', component: EstudianteComponent },
  { path: 'crearServicio', component: ServicioComponent },
  { path: 'generarTurno',  component: TurnoComponent }
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
