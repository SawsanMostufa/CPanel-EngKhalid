import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgProgressComponent, NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Observable, BehaviorSubject } from 'rxjs';
//import $ from 'jquery';
declare var $: any;
import * as signalR from '@aspnet/signalr';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { Pages } from '../../models/pages';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {
  userNameAr: any = "";
  displayName: any = "";
  cPanelLogo: any;
  //imagePath;
  imgPath = environment.imageUrl + "UserImages/";
  imgSettingPath = environment.imageUrl + "Logos/";
  imgUrl: string;
  cImgUrl: string;
  loadingNavigation: any;
  progressRef: NgProgressRef;
  _counter: number = 0;
  hubConnection: signalR.HubConnection;
  url = environment.url;
  appName: any;
  userRole: string = "";
  currentAuthPage: any;
  authDataList: any;
  authPageRoute: any;
  pages: Pages = new Pages();
  pageRealName: any;
  authList: any;
  currentLang: any;
  _currentLang = new BehaviorSubject<string>('en');
  pageRouteName: any;
  userImage = "../../../assets/users/user.png";
  defualtImage: string;
  apiBaseUrl: string = environment.url;
  settingsData: any;

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private progress: NgProgress,
    private authService: AuthService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute) {
    if (!this.auth.loggedIn() && !localStorage.getItem("token")) {
      this.auth.logout();
      return;
    }
    else {
      this.currentLang = localStorage.getItem("lang");
      this.displayName = localStorage.getItem('displayName');
    }
  }

  ngOnInit() {
  }


  logout() {
    this.authService.logout();
  }

  decline(): void {
    // this.modalService.hideModal();
  }

  /////loading templates js after dom render  
  ngAfterViewInit() {
    $.getScript('../../assets/plugins/custombox/dist/custombox.min.js', function () { });
    $.getScript('../../assets/plugins/custombox/dist/legacy.min.js', function () { });
    $.getScript('../../assets/js/jquery.core.js', function () { });
    $.getScript('../../assets/js/jquery.app.js', function () { });
    $.getScript('../../assets/js/waves.js', function () { });


  }



}
