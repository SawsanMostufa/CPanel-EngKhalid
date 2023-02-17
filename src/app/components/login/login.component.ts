import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { trigger, transition, style, animation, animate } from '@angular/animations';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginStatus: boolean = true;
  user: User;
  imgPath: string;
  public loading: boolean;
  online$: Observable<boolean>;
  logoPath = environment.imageUrl + "Logos/";
  imageLogo: string = "";
  settings: any;
  noSettings: boolean;
  userPermission: any;
  currentLang: string;
  settingsData: any;
  apBaseUrl: string = environment.url;
  logoImage: string = '../../../assets/images/Logo.jpeg';

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.initialData();
    this.createLoginForm();
  }

  initialData() {
    var _token = localStorage.getItem("token");

    if (_token != null) {
      this.router.navigate(['/category']);
    }
  }


  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(user) {
    this.loading = true;
    this.authService.login(user)
      .subscribe((reponse: any) => {
        setTimeout(() => {
          localStorage.setItem('displayName', reponse.displayname);
          localStorage.setItem('token', reponse.token);
          this.router.navigate(['/categories']);
          this.loading = false;
        }, 50);
      }, (err: any) => {
        setTimeout(() => {
          this.alertifyService.tError('Username/password error');
          this.loading = false;
          console.log(err.error);
        }, 50);
      }, () => {
        setTimeout(() => {

        }, 50);
      });
  }

}
