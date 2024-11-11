import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { HeroDetailComponent } from './UI/detail/hero-detail/hero-detail.component';
import { FormularioComponentHeroe } from './UI/formularios/formularioHeroes/formulario.component';
import { FormularioComponentVillain } from './UI/formularios/formularioVillains/formulario.component';
import { VillainDetailComponent } from './UI/detail/villain-detail/villain-detail.component';
import { PasarInformacionTablaComponent } from './UI/pasar-informacion-tabla/pasar-informacion-tabla.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', redirectTo: '/tabla/heroes' },
  { path: 'villains', redirectTo: '/tabla/villains' },
  { path: 'tabla/:tipoPersona', component: PasarInformacionTablaComponent },
  { path: 'detail/hero/:id', component: HeroDetailComponent },
  { path: 'detail/villain/:id', component: VillainDetailComponent },
  { path: 'newHeroes', component: FormularioComponentHeroe },
  { path: 'newVillains', component: FormularioComponentVillain },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
