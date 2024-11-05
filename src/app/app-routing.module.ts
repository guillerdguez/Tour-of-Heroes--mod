import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './UI/listas/heroe/heroes.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { HeroDetailComponent } from './UI/detail/hero-detail/hero-detail.component';
import { FormularioComponentHeroe } from './UI/formularios/formularioHeroes/formulario.component';
import { VillainsComponent } from './UI/listas/villains/villains.component';
import { FormularioComponentVillain } from './UI/formularios/formularioVillains/formulario.component';
import { VillainDetailComponent } from './UI/detail/villain-detail/villain-detail.component';
import { ChangeFechoriaComponent } from './UI/change-fechoria/change-fechoria.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'villains', component: VillainsComponent },
  { path: 'detail/hero/:id', component: HeroDetailComponent },
  { path: 'detail/villain/:id', component: VillainDetailComponent },
  { path: 'newHeroes', component: FormularioComponentHeroe },
  { path: 'newVillains', component: FormularioComponentVillain },
  { path: 'changeFechoria', component: ChangeFechoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
