import { Time } from "@angular/common";

export class Parametros {
    constructor(){}
    idServicio:number;
    fechaInicio:String;
    fechaFin:String;
    horaInicio:Time;
    horaFin:Time;
    estado: string[];
    listaEstados:string[];
    page : number;
    size: number;
}