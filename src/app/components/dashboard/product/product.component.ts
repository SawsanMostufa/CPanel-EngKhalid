import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/Product';
import { CommonSearchModel } from 'src/app/models/searchModel';
import { CategoryService } from 'src/app/services/category.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  commonSearchModel: CommonSearchModel = new CommonSearchModel();
  loadingProducts: boolean;
  products: any;
  config: any = {};
  imageUrl = environment.imageUrl + 'Images/Products/';
  loadingPaggingData: boolean;
  loadingProductSearch: boolean;
  loadingResetProduct: boolean;
  proId: number;
  loadingDelete: boolean;
  orderDetails: any;
  productForm: FormGroup;
  buttonTitle: string;
  modalTitle: string;
  categoryList: any;
  showAddloading: boolean;
  product: Product = new Product();
  loadingProductImage: boolean;
  imgToUpload: File = null;
  productPicture: string;
  imageName: string = "";
  defImage: string = "DefualtImage.png";
  loadingEdit: any;
  productObject: any;
  productDetails: any;
  imageAddEdit: string;
  fileRequired: boolean;


  constructor(private productService: ProductService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.getProducts(1);
    this.creatwProductForm();
    this.getCategories();
  }

  uploadProductImage(file: FileList) {
    this.loadingProductImage = true;
    this.imgToUpload = file.item(0);

    this.fileUploadService.postFile(this.imgToUpload, "Images")
      .subscribe((imageResult) => {
        setTimeout(() => {
          this.imageName = imageResult;
          this.loadingProductImage = false;
          this.showImage();
          this.fileRequired = false;
        }, 50);
      },
        () => {
          setTimeout(() => {
            this.toastr.error("Error in upload image");
            this.loadingProductImage = false;
          }, 50);

        }, () => {
          setTimeout(() => {
            //final
          }, 50);

        });
  }

  showImage() {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageAddEdit = event.target.result;
    }
    reader.readAsDataURL(this.imgToUpload);
  }

  getCategories() {
    this.categoryService.getAllCategories()
      .subscribe((response: any) => {
        this.categoryList = response;
      }, (err: any) => {
        this.toastr.error("Server response error");
      }, () => {
        //final
      });
  }

  creatwProductForm() {
    this.productForm = this.fb.group({
      id: [0],
      name: [, [Validators.required]],
      categoryId: [, [Validators.required, Validators.min(1)]],
      // price: [, [Validators.required]],
      //   quantity: [, [Validators.required]],
      // discount: [, [Validators.required]],
      description: [""],
      productSizes: this.fb.array(
        [this.fb.group({
          id: [],
          productId: [],
          value: [, [Validators.required]],
          price: [, [Validators.required]],
          discount: [, [Validators.required]],
          quantity: [, [Validators.required]],
        })])
    });
  }
  get productSizes() {
    return this.productForm.get('productSizes') as FormArray;
  }
  addSize(event: any) {
    this.productSizes.push(this.fb.group({
      value: [, [Validators.required]],
      price: [, [Validators.required]],
      discount: [, [Validators.required]],
      quantity: [, [Validators.required]],
    }));
  }
  onSubmit(product: any) {
    this.showAddloading = true;

    if (product.id == 0 || product.id == null) {
      if (this.imageName == "DefualtImage.png" || this.imageName == "") {
        this.imageName = "";
        return;
      }

      this.product = new Product();
      this.product.id = 0;
      this.product.name = product.name;
      this.product.categoryId = product.categoryId;
      // this.product.quantity = product.quantity;
      this.product.description = product.description;
      this.product.pictureUrl = this.imageName;
      let SizeList: any = [];

      for (let index = 0; index < product.productSizes.length; index++) {
        SizeList.push({
          value: product.productSizes[index].value, price: product.productSizes[index].price,
          discount: product.productSizes[index].discount, quantity: product.productSizes[index].quantity
        });

      }
      this.product.productSizes = SizeList;



      this.productService.addProduct(this.product)
        .subscribe(() => {
          setTimeout(() => {
            this.toastr.success("Added successfully");
            this.closeModal();
            this.getProducts(1);
            this.product = new Product();
            this.productForm.reset();
            this.imageName = "";
            this.imageAddEdit = "../../../assets/users/NoImage.jpg";
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
      if (this.imageName == "DefualtImage.png" || this.imageName == "") {
        this.imageName = "DefualtImage.png";
      }

      this.product.id = product.id;
      this.product.name = product.name;
      this.product.categoryId = product.categoryId;
      //   this.product.quantity = product.quantity;
      this.product.description = product.description;
      this.product.pictureUrl = this.imageName;

      this.productService.updateProduct(this.product)
        .subscribe(() => {
          setTimeout(() => {
            this.toastr.success("Updated successfully");
            this.getProducts(1);
            this.closeModal();
            this.product = new Product();
            this.productForm.reset();
            this.imageAddEdit = "../../../assets/users/NoImage.jpg";
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

  getProductForEdit(id: any, template: TemplateRef<any>) {
    this.loadingEdit = id;

    setTimeout(() => {
      this.buttonTitle = "Update";
      this.modalTitle = "Update product"

      this.productObject = this.products.find(p => p.id == id);

      Object.entries(this.productObject).filter(([_, v]) => Array.isArray(v))
        .map((kv) => this.createFormArrays(kv, this.productForm));
      this.productForm.patchValue(this.productObject);

      if (this.productObject.pictureUrl != "") {
        this.imageName = this.productObject.pictureUrl;
      }

      this.product = new Product();
      this.modalService.showModalLG(template);
      this.loadingEdit = 0;
    }, 50);
  }

  createFormArrays = ([k, v], form: FormGroup) => {
    if (form.contains(k)) {
      form.controls[k] =
        new FormArray(this.createFormArray(v as []));
    }
  }

  createFormArray = (data: any[]) =>
    data.map(c => (
      new FormGroup(Object.entries(c)
        .reduce((acc, [key, value]) => {
          acc[key] = new FormControl(value)
          return acc;
        }, {}))
    ))

  checkMobilNumber(event: any) {
    const pattern = /[0-9\+\-\. ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getProducts(pageNo: any) {
    this.loadingProducts = true;
    this.commonSearchModel.pageNo = pageNo;

    this.productService.getProductsPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.products = response.data;
          console.log(this.products);
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: response.count
          };
          this.loadingProducts = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingProducts = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  getNextProduct(pageNo) {
    this.loadingPaggingData = true;
    this.commonSearchModel.pageNo = pageNo;

    this.productService.getProductsPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.products = response.data;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: response.count
          };
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

  getProductSearch() {
    this.loadingProductSearch = true;
    this.commonSearchModel.pageNo = 1;

    this.productService.getProductsPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.products = response.data;
          this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: response.count
          };
          this.loadingProductSearch = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingProductSearch = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  resetProduct(pageNo: any) {
    this.loadingResetProduct = true;
    this.commonSearchModel.pageNo = pageNo;
    this.commonSearchModel.searchText = null;

    this.productService.getProductsPaging(this.commonSearchModel)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.products = response.data;
          this.config = {
            itemsPerPage: 5,
            currentPage: pageNo,
            totalItems: response.count
          };
          this.loadingResetProduct = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.loadingResetProduct = false;
          this.toastr.error("Server response error");
          console.log(err.error);
        }, 50);
      }, () => {
        //final
      });
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.proId = id;
    this.modalService.showConfirmModal(template);
  }

  deleteProduct() {
    if (this.proId == null) {
      this.toastr.error("Error !");
      return;
    }

    this.loadingDelete = true;
    this.productService.deleteProduct(this.proId)
      .subscribe((response: any) => {
        setTimeout(() => {
          if (response == true) {
            this.toastr.success("Deleted successfully");
            this.closeModal();
            this.getProducts(1);
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

  closeModal() {
    this.product = new Product();
    this.modalService.hideModal();
    this.productForm.reset();
    this.defImage = "../../../assets/users/NoImage.jpg";
    //this.resetForm();
  }

  getProductDetails(id: any, template: TemplateRef<any>) {
    this.productDetails = this.products.find(p => p.id == id);
    this.product = new Product();
    this.modalService.showModalLG(template);
  }

  showModal(template: TemplateRef<any>) {
    this.buttonTitle = "Save";
    this.modalTitle = "Add product"
    this.imageName = "DefualtImage.png";
    this.product = new Product();
    this.modalService.showModalLG(template);

  }


}
