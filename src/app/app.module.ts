import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';
import { TabsModule , ModalModule, BsDatepickerModule, BsDropdownModule, BsDropdownToggleDirective} from 'ngx-bootstrap';
import { DropdownListModule } from 'ngx-dropdown-list';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AlertifyService } from './services/alertify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './services/auth.Interceptor';
import { ModalService } from './services/modal.service';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgxEditorModule } from 'ngx-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TreeNgxModule } from 'tree-ngx';
import { TreeModule } from 'angular-tree-component';
import { NgxTextEditorModule } from 'ngx-text-editor';
import { NgxGalleryModule, CustomHammerConfig } from 'ngx-gallery';
import 'hammerjs';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { MomentModule, TimeAgoPipe } from 'ngx-moment';

import { CKEditorModule } from 'ng2-ckeditor';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { TreeviewModule } from 'ngx-treeview';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule, DatePipe } from '@angular/common';
import { JobsService } from './services/jobs.service';
import { JobsResolverService } from './resolvers/jobs-resolver.service';
import { NgSwitcheryModule } from 'angular-switchery-ios';
import { UsersService } from './services/users.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FilterAssetsPipePipe } from './pipes/filter-assets-pipe.pipe';
//import { QRCodeModule } from 'angular2-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
//import { QrCodeModule } from 'ng-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxPrintElementModule } from 'ngx-print-element';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { CategoryService } from './services/category.service';
import { OrderComponent } from './components/dashboard/order/order.component';
import { OrderService } from './services/order.service';
import { ProductComponent } from './components/dashboard/product/product.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { MyprofileComponent } from './components/dashboard/myprofile/myprofile.component';
import { TextInputComponent } from './components/dashboard/text-input/text-input.component';
import { ProfileResolverService } from './resolvers/profile-resolver.service';

export function getToken() {
  return localStorage.getItem('token');
}

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http,'./assets/i18n/','.json');
// }

export function getLang() {
  var lang = localStorage.getItem('lang') == "" || localStorage.getItem('lang') == null ? "en" : localStorage.getItem('lang');
  localStorage.setItem("lang",lang);
  return lang;
}

@NgModule({
  declarations: [
    AppComponent,  
    LoginComponent,
    DashboardComponent,    
    FilterAssetsPipePipe,
    ServerErrorComponent,
    NotFoundComponent,
    CategoryComponent,
    OrderComponent,
    ProductComponent,
    UserComponent,
    MyprofileComponent,
    TextInputComponent
  ],
  imports: [
    //QrCodeModule,
    //QRCodeModule,
    // BsDropdownModule,
    NgxPrintElementModule,
    NgxQRCodeModule,
    QRCodeModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgSwitcheryModule,
    
    TreeviewModule.forRoot(),
    OrganizationChartModule,
    TreeModule.forRoot(),
    TreeNgxModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    NgxEditorModule ,
    NgxTextEditorModule ,
    CKEditorModule,
    NgProgressModule.withConfig({
      min: 0.08,
      max: 100,
      ease: 'linear',
      speed: 200,
      trickleSpeed: 300,
      meteor: true,
      spinner: true,
      spinnerPosition: 'left',
      direction: 'ltr+',
      color: 'black',
      thick: true,
      fixed: true
    }),
    NgxPrintModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true,
      progressBar: false
    }),
    ChartsModule,
    DropdownListModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FileUploadModule,
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [environment.apiUrl],
        blacklistedRoutes: [environment.apiUrl + 'account']
      },
  }),
    ModalModule.forRoot(),
    NgSelectModule,
    NgxGalleryModule,
    MomentModule,
//     TranslateModule.forRoot({
//       loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient]
//       }
//       ,defaultLanguage: 'ar'
  
// })
  ],
  providers: [
    OrderService,
    CategoryService,
    JobsService,
    ModalService,
    AlertifyService,
    JobsResolverService,
    UsersService,
    DatePipe,
    ProfileResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ,{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true
    },
    //,{ provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
