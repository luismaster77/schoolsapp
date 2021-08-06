import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComercioComponent } from './comercio/comercio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { TurnoComponent } from './turno/turno.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'crearComercio', component: ComercioComponent },
  { path: 'crearServicio', component: ServicioComponent },
  { path: 'generarTurno',  component: TurnoComponent }
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
