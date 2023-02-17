import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  message: any;
  btnTitle: any;

  constructor() { }

  ngOnInit() {
    localStorage.getItem("lang") == 'ar' ?  this.message = "الصفحة التي تبحث عنها غير موجودة"
          : this.message = "The page you are looking for was not found.";

    localStorage.getItem("lang") == 'ar' ?  this.btnTitle = "العودة الي الصفحة الرئيسية"
          : this.btnTitle = "Back to Home Page";
  }

  
}
