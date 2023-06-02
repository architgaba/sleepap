import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
import { FaqQuestionsComponent } from './faq-questions/faq-questions.component';
import { ChatComponentComponent } from './chat-component/chat-component.component';
const routes: Routes = [
  {path: '', redirectTo:"home",pathMatch:"full"},
  { path: 'home', component: HomeComponent },
  { path: 'product-description', component: DescriptionComponent },
  { path: 'faq', component: FaqQuestionsComponent },
  { path: 'chat', component: ChatComponentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
