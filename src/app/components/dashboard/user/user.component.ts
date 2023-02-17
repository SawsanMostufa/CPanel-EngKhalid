import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonSearchModel } from 'src/app/models/searchModel';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loadingUsers: boolean;
  users: any;
  config: any = {};
  commonSearchModel: CommonSearchModel = new CommonSearchModel();
  loadingUsersSearch: boolean;
  loadingResetUers: boolean;
  userId: number;
  loadingPaggingData: boolean;
  loadingDelete: boolean;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.getUsers(1);
  }


  getUsers(pageNo: any) {
    this.loadingUsers = true;
    this.commonSearchModel.pageNo = pageNo;
    this.commonSearchModel.searchText = null;

    this.userService.getUsers(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          console.log(response);
          this.users = response.data;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.users.count
          };
          console.log(this.users);
          this.loadingUsers = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingUsers = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  getUsersSearch(pageNo: any) {
    this.loadingUsersSearch = true;
    this.commonSearchModel.pageNo = pageNo;

    this.userService.getUsers(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.users = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.users.count
          };
          console.log(this.users);
          this.loadingUsersSearch = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingUsersSearch = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  resetUsers(pageNo: any) {
    this.loadingResetUers = true;
    this.commonSearchModel.pageNo = pageNo;
    this.commonSearchModel.searchText = null;

    this.userService.getUsers(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.users = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.users.count
          };
          console.log(this.users);
          this.loadingResetUers = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingResetUers = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  getNextUser(pageNo: any) {
    this.loadingPaggingData = true;
    this.commonSearchModel.pageNo = pageNo;

    this.userService.getUsers(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.users = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.users.count
          };
          console.log(this.users);
          this.loadingPaggingData = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingPaggingData = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.userId = id;
    this.modalService.showConfirmModal(template);
    console.log(this.userId);
  }


  closeModal() {
    this.modalService.hideModal();
  }

  deleteUser() {
    if (this.userId == null) {
      this.toastr.error("Error !");
      return;
    }

    this.loadingDelete = true;
    this.userService.deleteUser(this.userId)
      .subscribe(() => {
        setTimeout(() => {
          this.getUsers(1);
          this.closeModal();
          this.loadingDelete = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingDelete = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }


}
