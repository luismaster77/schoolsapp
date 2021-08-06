import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Servicio } from './servicio';

export class Turno {
    constructor(
      public idTurno: any = 0,
      public fechaTurno: NgbDateStruct = null,
      public horaInicio: Date = null,
      public horaFin: Date = null,
      public estado: string = "",
      public idServicio: any = 0,
      public servicio: string = "Seleccione servicio",
    ) {}
  }

