import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

declare var $: any;
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastr: ToastrService) {}

    showSucess(message: any, title: any) {
        //this.showNotification(message, 2);
        this.toastr.success(message, 'Sucesso');
    }

    showError(message: any, title: any) {
        //this.showNotification(message, 4);
        this.toastr.error(message, 'Erro');
    }

    showInfo(message: any, title: any) {
        //this.showNotification(message,  1);
        this.toastr.info(message, 'Info');
    }

    showWarning(message: any, title: any) {
        //this.showNotification(message, 3);
        this.toastr.warning(message, 'Alerta');
    }
    
    private showNotification(msg, color){
        const type = ['','info','success','warning','danger'];
  
        $.notify({
            icon: "notifications",
            message: msg
  
        },{
            type: type[color],
            timer: 300,
            placement: {
                from: 'top',
                align: 'right'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert" data-dismiss="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss" data-dismiss="alert">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
}