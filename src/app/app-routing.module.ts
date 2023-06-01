import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
const routes: Routes = [
  {path: '', redirectTo:"home",pathMatch:"full"},
  { path: 'home', component: HomeComponent },
  { path: 'product-description', component: DescriptionComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
