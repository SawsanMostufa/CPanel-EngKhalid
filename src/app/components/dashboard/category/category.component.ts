import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonSearchModel } from 'src/app/models/searchModel';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: any;
  config: any = {};
  loadingPaggingData: boolean = false;
  buttonTitle: string;
  modalTitle: string;
  catId: number;
  loadingDelete: boolean;
  showAddloading: boolean;
  category: any;
  loadingCategories: boolean;
  commonSearchModel: CommonSearchModel = new CommonSearchModel();
  loadingCategorySearch: boolean;
  loadingResetCategory: boolean;

  constructor(private fb: FormBuilder,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCategories(1);
    this.createCategoryForm();
  }

  getCategoryFromRoute() {
    this.route.data.subscribe(data => {
      this.categories = data['categoryList'];
    });
  }

  getCategories(pageNo: any) {
    this.loadingCategories = true;
    this.commonSearchModel.pageNo = pageNo;

    this.categoryService.getCategorPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.categories = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.categories.count
          };
          this.loadingCategories = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingCategories = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  resetCategories() {
    this.loadingResetCategory = true;
    this.commonSearchModel.pageNo = 1;
    this.commonSearchModel.searchText = null;

    this.categoryService.getCategorPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.categories = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.categories.count
          };
          this.loadingResetCategory = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingResetCategory = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  getCategoriesSearch(pageNo: any) {
    this.loadingCategorySearch = true;
    this.commonSearchModel.pageNo = pageNo;

    this.categoryService.getCategorPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.categories = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: this.categories.count
          };
          this.loadingCategorySearch = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingCategorySearch = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      id: [0],
      name: [, [Validators.required]]
    });
  }

  getNextCategory(event: any) {
    this.loadingPaggingData = true;
    this.commonSearchModel.pageNo = event;

    this.config.currentPage = event;
    this.categoryService.getCategorPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.categories = response;
          this.config = {
            itemsPerPage: 5,
            currentPage: event,
            totalItems: this.categories.count
          };
        }, 50);
      }, (err) => {
        setTimeout(() => {
          this.loadingPaggingData = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        this.loadingPaggingData = false;
      });
  }

  showModal(template: TemplateRef<any>) {
    this.buttonTitle = "Save";
    this.modalTitle = "Add category"
    this.modalService.showModalMD(template);
  }

  closeModal() {
    this.modalService.hideModal();
    this.resetForm();
  }

  resetForm() {
    this.categoryForm.reset();
    this.categoryForm.controls['id'].setValue(0);
    this.categoryForm.controls['name'].setValue('');
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.catId = id;
    this.modalService.showConfirmModal(template);
  }

  deleteCategory() {
    if (this.catId == null) {
      this.toastr.error("Error !");
      return;
    }

    this.loadingDelete = true;
    this.categoryService.deleteCategory(this.catId)
      .subscribe((response: any) => {
        setTimeout(() => {
          if (response == true) {
            this.toastr.success("Deleted successfully");
            this.closeModal();
            this.getCategories(1);
          }
          else {
            this.loadingDelete = false;
            this.toastr.error("Error in deletion");
          }
        }, 50);
      }, (err) => {
        setTimeout(() => {
          this.loadingDelete = false;
          this.toastr.error("Error in deletion");
        }, 50);
      }, () => {
        this.loadingDelete = false;
      });

  }

  onSubmitCategory(category: any) {
    this.showAddloading = true;

    if (category.id == 0) {
      this.categoryService.addCategory(category)
        .subscribe(() => {
          setTimeout(() => {
            this.toastr.success("Added successfully");
            this.closeModal();
            this.getCategories(1);
          }, 50);
        }, (err) => {
          setTimeout(() => {
            this.showAddloading = false;
            this.toastr.error("Error in Add");
            console.log(err.error);
          }, 50);
        }, () => {
          this.showAddloading = false;
        });
    }
    else {
      this.categoryService.updateCategory(category)
        .subscribe(() => {
          setTimeout(() => {
            this.toastr.success("Updated successfully");
            this.getCategories(1);
            this.closeModal();
          }, 50);
        }, (err) => {
          setTimeout(() => {
            this.showAddloading = false;
            this.toastr.error("Error in update");
            console.log(err.error);
          }, 50);
        }, () => {
          this.showAddloading = false;
        });
    }

  }

  getCategoryForEdit(id, template: TemplateRef<any>) {
    this.buttonTitle = "Update";
    this.modalTitle = "Update category"


    this.category = this.categories.data.find(c => c.id == id);

    this.categoryForm.controls['id'].setValue(this.category.id);
    this.categoryForm.controls['name'].setValue(this.category.name);

    this.modalService.showModalMD(template);
  }



}
