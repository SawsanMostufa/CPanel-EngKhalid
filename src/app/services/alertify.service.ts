import { Injectable } from '@angular/core';
declare let alertify: any;
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor(private toastr: ToastrService) { }

  confirm(title: string, message: string, okCallback: () => any) {
    alertify.set('notifier','position', 'bottom-left');
    
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    }).setHeader(title);

   
  }

  success(message: string) {
    alertify.set('notifier','position', 'bottom-left');
    var title = "<div  style='padding-bottom: 6px;text-align: center;margin-bottom: 11px;border-bottom: 1px solid #e2e4e2'>" + "إشعار" + "</div>" + "<center>" + message +" </center>" + "<a class='close-icon'></a>"
    alertify.success(title);
    //alertify.success('<center>' + message + '</center>' +'<a class="close-icon"></a>');
  }

  error(message: string) {
    alertify.set('notifier','position', 'bottom-left');
    var title = "<div  style='padding-bottom: 6px;text-align: center;margin-bottom: 11px;border-bottom: 1px solid #e2e4e2'>" + "إشعار" + "</div>" + "<center>" + message +" </center>" + "<a class='close-icon'></a>"
    alertify.error(title);
  }

  error2(message: string, title: string) {
    var title = "<center>" + title + " </center>" + "<center>" + message +" </center>"
   alertify.set('notifier','position', 'bottom-left');
   alertify.error('<center>' + title + '</center>' +'<a class="close-icon"></a>');
 }

  warning(message: string) {
    alertify.set('notifier','position', 'bottom-left');
    alertify.warning('<center>' + message + '</center>' +'<a class="close-icon"></a>');
  }
  
  message(message: string) {
    alertify.set('notifier','position', 'bottom-left');
    alertify.message('<center>' + message + '</center>' +'<a class="close-icon"></a>');
  }

  //=========== toaster message ==================

  tSuccess(message: string) {
    var title = "<div  style='padding-bottom: 6px;text-align: center;margin-bottom: 11px;border-bottom: 1px solid #e2e4e2'></div>" + "<center>" + message +" </center>";
    //var _message = "<center style='margin-top: 20px;margin-bottom: 20px'>" + title +"</center>";
    //this.toastr.success(title);
    this.toastr.success("<center>" + message +" </center>");
  }

  tError(message: string) {
    this.toastr.error("<center>" + message +" </center>");
  }

  tWarning(message: string) {
    this.toastr.warning("<center>" + message +" </center>");
  }

}
