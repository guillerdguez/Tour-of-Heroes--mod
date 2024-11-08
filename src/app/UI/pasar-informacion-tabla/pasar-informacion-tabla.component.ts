import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroModel } from '../../Model/Views/Dynamic/HeroModel';
import { HeroService } from '../../Service/hero.service';
import { PersonaModel } from '../../Model/Views/Dynamic/PersonaModel';
import { VillainService } from '../../Service/villain.service';

@Component({
  selector: 'app-pasar-informacion-tabla',
  template: `
    <h2 class="title">
      {{ title }}
    </h2>
    @if(personaModel.personas.length> 0){
    <div class="continer">
      <app-select-form
        (selectedTable)="onTableSelected($event)"
        [isTableEmpty]="selectedTable.length == 0"
        [items]="personaModel.personas[0].menuItemOptions()"
      ></app-select-form>
      <app-esquema-lista
        [title]="title"
        [params]="personaModel.personas"
        (TableSelected)="onTableSelected($event)"
      ></app-esquema-lista>
    </div>
    } @else {
    <h2 class="title">Sin resultados</h2>
    }
  `,
})
export class PasarInformacionTablaComponent {
  title!: any;
  toggleFavorite!: any;
  selectedTable: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public heroModel: HeroModel,
    public heroService: HeroService,
    public personaModel: PersonaModel,
    public villainService: VillainService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tipoPersona = params.get('tipoPersona');

      if (tipoPersona === 'heroes') {
        this.heroService.getHeroesArray();
        this.title = 'Heroes';
      } else {
        this.villainService.getVillainsArray();
        this.title = 'Villains';
      }
    });
  }

  onTableSelected(selectedTables: any) {
    this.selectedTable = [...selectedTables];
  }
}
