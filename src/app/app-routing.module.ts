import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { OrderComponent } from './components/dashboard/order/order.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { MyprofileComponent } from './components/dashboard/myprofile/myprofile.component';
import { ProfileResolverService } from './resolvers/profile-resolver.service';

const appRoutes: Routes = [ 
  { path:'server-error' ,component: ServerErrorComponent},
  { 
    path:'' ,component: DashboardComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',    
    children:
    [ 
      { path: 'categories', component: CategoryComponent},
      { path: 'orders', component: OrderComponent},
      { path: 'products', component: ProductComponent},
      { path: 'users', component: UserComponent},
      { path: 'my-profile', component: MyprofileComponent, resolve: {myProfile: ProfileResolverService }}
    ]
  },
  { path:'login' ,component: LoginComponent}, 
  { path:'' , component: CategoryComponent},      
  { path:'**',component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

