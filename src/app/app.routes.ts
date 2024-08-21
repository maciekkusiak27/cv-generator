import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GeneratorComponent } from './generator/generator.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'generator', component: GeneratorComponent }, 
    // { path: '**', redirectTo: '' } 
    { path: '**', redirectTo: 'generator' } 
  ];
