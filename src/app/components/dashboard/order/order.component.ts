import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchModel } from 'src/app/models/searchModel';
import { ModalService } from 'src/app/services/modal.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any;
  config: any = {};
  loadingPaggingData: boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  searchModel: SearchModel = new SearchModel();
  loadingResetOrders: boolean;
  loadingSearch: boolean;
  loadingOrders: boolean;
  imageUrl = environment.imageUrl + "Images/Products/";
  loadOrderItems: number;
  orderDetails: any;

  constructor(private fb: FormBuilder,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.getOrders(1);
    this.initialData();
  }

  initialData() {
    this.bsConfig = {
      containerClass: 'theme-red',
      // dateInputFormat: 'YYYY/MM/DD',
      dateInputFormat: 'DD/MM/YYYY',
      isAnimated: true
    };
  }

  getOrders(pageNo: any) {
    this.loadingOrders = true;
    this.searchModel.pageNo = pageNo;

    this.orderService.getOrders(this.searchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.orders = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.orders.count
          };
          this.loadingOrders = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingOrders = false;
          this.toastr.error("Server response error");
        }, 50);
      }, () => {

      });
  }

  getNextOrder(pageNo: any) {
    this.loadingPaggingData = true;
    this.searchModel.pageNo = pageNo;

    this.orderService.getOrders(this.searchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.orders = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.orders.count
          };
          this.loadingPaggingData = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingPaggingData = false;
          this.toastr.error("Server response error");
        }, 50);
      }, () => {
        //final
      });
  }


  resetOrders(pageNo: any) {
    this.loadingResetOrders = true;

    this.searchModel.pageNo = pageNo;
    this.searchModel.dateFrom = null;
    this.searchModel.dateTo = null;
    this.orderService.getOrders(this.searchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.orders = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.orders.count
          };
          this.searchModel = new SearchModel();
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingResetOrders = false;
        }, 50);
      }, () => {
        this.loadingResetOrders = false;
      });
  }

  closeModal() {
    this.modalService.hideModal();
  }

  getOrdersSearch(pageNo: any) {
    this.loadingSearch = true;
    this.searchModel.pageNo = pageNo;
    this.searchModel.pageSize = 5;

    this.orderService.getOrders(this.searchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.orders = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.orders.count
          };
          this.loadingSearch = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingSearch = false;
          this.toastr.error("Server response error");
        }, 50);
      }, () => {
        //final
      });
  }

  getOrderItems(oId: any, template: TemplateRef<any>) {
    debugger
    this.loadOrderItems = oId;
    this.orderService.getOrderItems(oId)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.orderDetails = response;
          console.log(this.orderDetails)
          this.modalService.showModalLG(template);
          this.loadOrderItems = 0;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadOrderItems = 0;
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

}
