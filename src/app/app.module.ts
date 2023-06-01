import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule, CardsModule, InputsModule, MDBBootstrapModulesPro, NavbarModule,SmoothscrollModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// For MDB Angular Pro
import { CarouselModule, WavesModule } from 'ng-uikit-pro-standard';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component'
// For MDB Angular Pro
// MDB Angular Pro
import { IconsModule } from 'ng-uikit-pro-standard';
import { DescriptionComponent } from './description/description.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactUsComponent,
    FooterComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    CarouselModule, WavesModule, ButtonsModule, 
    CardsModule, InputsModule,NavbarModule,IconsModule,
    ReactiveFormsModule,FormsModule,SmoothscrollModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
