import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  }, 
  {
    path: 'directorio', component: DirectorioComponent
  }, 
  {
    path: '**', redirectTo: 'directorio', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
