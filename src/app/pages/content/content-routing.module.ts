import { ServiceModule } from './../../services/services.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main-container/main-container.module').then((m) => m.MainContainerModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ServiceModule],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
