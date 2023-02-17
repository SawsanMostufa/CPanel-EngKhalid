import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  showModalLG(template: TemplateRef<any>){
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      class: 'gray modal-lg'      
    };
    this.modalRef = this.modalService.show(template, config );
  }

  showModalMD(template: TemplateRef<any>){
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-md'      
    };

    this.modalRef = this.modalService.show(template, config );
  }

  showConfirmModal(template: TemplateRef<any>){
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-sm modal-dialog-centered'      
    };

    this.modalRef = this.modalService.show(template, config );
  }

  showConfirmModalLG(template: TemplateRef<any>){
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-md modal-dialog-centered'      
    };

    this.modalRef = this.modalService.show(template, config );
  }

  hideModal() {   
    this.modalRef.hide();
  }

 

}
