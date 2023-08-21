import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { PlotterComponent } from './components/plotter/plotter.component';
import { AboutComponent } from './components/about/about.component';
import { LibraryComponent } from './components/library/library.component';

const appRoutes: Routes = [
  {path: '', component: PlotterComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'about', component: AboutComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    FooterComponent,
    PlotterComponent,
    AboutComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
