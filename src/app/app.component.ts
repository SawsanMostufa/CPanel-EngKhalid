import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router,Event, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadingNavigation: any;
  progressRef: NgProgressRef;
  mySubscription: any
  currentLang: string;
  public page_title: any;

  constructor(private router: Router, 
    private spinner: NgxSpinnerService,
    private progress: NgProgress) 
    {
        this.currentLang = localStorage.getItem("lang");
        if(this.currentLang == '' || this.currentLang == null){
          this.currentLang  = 'ar';       
        }
    }

    loadLanguage(lang){
      document.getElementById('theme1').setAttribute('href', '');
      document.getElementById('theme2').setAttribute('href', '');
      document.getElementById('theme3').setAttribute('href', '');
      document.getElementById('theme4').setAttribute('href', '');
      document.getElementById('theme5').setAttribute('href', '');
      document.getElementById('theme6').setAttribute('href', '');
  
      if (localStorage.getItem("lang") == 'ar') {
        document.title = "ثروات البحار"
        document.getElementById('theme1').setAttribute('href', '../assets/css/bootstrap.min-ar.css');
        document.getElementById('theme2').setAttribute('href', '../assets/css/bootstrap_rtl.css');
        document.getElementById('theme3').setAttribute('href', '../assets/css/style-ar.css');
        document.getElementById('theme4').setAttribute('href', '../assets/css/icons-ar.css');
        document.getElementById('theme5').setAttribute('href', '../assets/css/tree-rtl.css');
        document.getElementById('theme6').setAttribute('href', '../assets/css/custome-rtl.css');
      
        document.querySelector('body').setAttribute('dir', 'rtl');
        this.currentLang = lang;
        localStorage.setItem("lang", lang);
      }
      else{
        document.title = "The riches of the seas"
        
        document.getElementById('theme1').setAttribute('href', '../assets/css/bootstrap.min.css');
        document.getElementById('theme2').setAttribute('href', '../assets/css/style.css');
        document.getElementById('theme3').setAttribute('href', '../assets/css/icons.css');
        document.getElementById('theme4').setAttribute('href', '../assets/css/tree-ltr.css');
        document.getElementById('theme5').setAttribute('href', '../assets/css/tree-rtl.css');
        document.getElementById('theme6').setAttribute('href', '../assets/css/custome-ltr.css');      
        document.querySelector('body').setAttribute('dir', 'ltr');
    
        this.currentLang = lang;
        localStorage.setItem("lang", lang);
      }
    }
    
  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
        
    this.router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        this.startLoading();
      }
      if(routerEvent instanceof NavigationEnd){
        this.completeLoading();
      }
    });

  }

  startLoading() {
    this.progressRef.start();
  }

  completeLoading() {
    this.progressRef.complete();
  }
    
}
