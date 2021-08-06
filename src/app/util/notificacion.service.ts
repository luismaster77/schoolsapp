import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() { }

  changeAlertConfirmacion(name: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: name+' creado exitosamente',
      showConfirmButton: false,
      timer: 1700
    })
  }

  changeAlertUpdate(name: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: name+ ' actualizado exitosamente',
      showConfirmButton: false,
      timer: 1700
    })
  }

  showSuccessAlert() {
    Swal.fire('Muy bien!', 'Turno reservado exitosamente', 'success')
  }
  showSuccessAlertCancel() {
    Swal.fire('Ok!', 'Turno cancelado exitosamente', 'success')
  }
  showWarningAlert() {
    Swal.fire('Hey!', 'Turno no disponible para el periodo y servicio seleccionado, favor selecciona otro periodo o servicio', 'warning')
  }
}
