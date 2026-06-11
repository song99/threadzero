import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home.component/home.component').then(m => m.HomeComponent),
    title: 'ThreadZero - Sustainable AI Crowdfunding'
  },
  {
    path: 'gallery',
    loadComponent: () => import('./components/gallery.component/gallery.component').then(m => m.GalleryComponent),
    title: 'Explore Campaigns | ThreadZero'
  },
  {
    path: 'campaign/:id',
    loadComponent: () => import('./components/campaign.component/campaign.component').then(m => m.CampaignComponent),
    title: 'Campaign Details | ThreadZero'
  },
  {
    path: 'creator',
    loadComponent: () => import('./components/creator.component/creator.component').then(m => m.CreatorComponent),
    title: 'Creator Studio | ThreadZero'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard.component/dashboard.component').then(m => m.DashboardComponent),
    title: 'Admin Dashboard | ThreadZero'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
