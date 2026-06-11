import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './components/home.component/home.component';
import { CampaignComponent } from './components/campaign.component/campaign.component';
import { CreatorComponent } from './components/creator.component/creator.component';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { GalleryComponent } from './components/gallery.component/gallery.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    App,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeComponent,
    CampaignComponent,
    CreatorComponent,
    DashboardComponent,
    GalleryComponent,
    NavBarComponent,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
