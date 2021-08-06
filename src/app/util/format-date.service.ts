import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
  })
export class FormatDateService{

    constructor() { }

    getTime(date:any): any{
        return moment.utc(date).format('hh:mm:ss a');
    }

    getTime24H(date: any) {
        return moment.utc(date).format('HH:mm a');
    }
    
    getTime24H2(date: any) {
        return moment.utc(date).format('HH:mm');
    }
    
    getFormat(date: any) {
        return moment.utc(date).format('yyyy-MM-DD hh:mm:ss a');
    }

    getFormatFecha(date: any) {
        return moment.utc(date).format('yyyy-MM-DD');
    }

    getFormatFecha24H(date:any){
        return moment.utc(date).format('yyyy-MM-DD HH:mm:ss');
    }

    getFormatFecha12H(date:any){
        return moment.utc(date).format('yyyy-MM-DD hh:mm:ss a');
    }

    getFormatH(date:any){
        return moment.utc(date).format('hh:mm:ss a');
      }

}