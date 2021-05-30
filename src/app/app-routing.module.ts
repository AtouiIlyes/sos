import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/full/full.module').then((m) => m.FullModule),
  },
  { path: 'dashboard', loadChildren: () => import('./pages/content/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'health-card', loadChildren: () => import('./pages/content/health-card/health-card.module').then(m => m.HealthCardModule) },
  { path: 'family-group', loadChildren: () => import('./pages/content/family-group/family-group.module').then(m => m.FamilyGroupModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
