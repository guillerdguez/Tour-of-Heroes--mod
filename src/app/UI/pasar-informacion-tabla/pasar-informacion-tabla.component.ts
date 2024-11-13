import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroModel } from '../../Model/Views/Dynamic/HeroModel';
import { HeroService } from '../../Service/hero.service';
import { PersonaModel } from '../../Model/Views/Dynamic/PersonaModel';
import { VillainService } from '../../Service/villain.service';
import { Hero } from '../../Model/Domain/hero';
import { PersonaConPoderes } from '../../Model/Domain/personaConPoderes';
import { heroDAO } from '../../DAO/hero.DAO';
import { VillainModel } from '../../Model/Views/Dynamic/VillainModel';
import { Villain } from '../../Model/Domain/villain';

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
        [isTableEmpty]="
          selectedTable.length == 0 && personaModel.personas.length != 0
        "
        [items]="personaModel.personas[0].getMenuItemOptions()"
      ></app-select-form>
      <app-esquema-lista
        [title]="title"
        [params]="personaModel.personas"
        (paramsChange)="onParamsChange($event)"
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
    public villainModel: VillainModel,

    public villainService: VillainService
  ) {}

  ngOnInit(): void {
    // setInterval(() => console.log(this.personaModel.personas), 200);
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

  // onParamsChange(updatedParams: PersonaConPoderes) {
  //   this.route.paramMap.subscribe((params) => {
  //     const tipoPersona = params.get('tipoPersona');
  //     if (tipoPersona === 'heroes') {
  //       console.log(this.personaModel.personas, 'aDADVASDASD');

  //       this.personaModel.personas.forEach((persona) => {
  //         console.log(persona.setDetails(persona as Hero));
  //         // this.heroModel.hero = persona.setDetails(persona as Hero) as Hero;
  //         this.heroService.updateHero(persona);
  //       });
  //       // this.heroModel.heroes = updatedParams as Hero[];
  //       this.personaModel.persona = updatedParams;
  //     } else {
  //       this.villainService.updateVillain(updatedParams);
  //     }
  //   });
  // }

  onParamsChange(updatedParams: PersonaConPoderes) {
    this.route.paramMap.subscribe((params) => {
      const tipoPersona = params.get('tipoPersona');
      if (tipoPersona === 'heroes') {
        this.heroModel.hero = updatedParams as Hero;
        this.heroService.updateHero(this.heroModel.hero.getHeroData());
      } else {
        this.villainModel.villain = updatedParams as Villain;
        this.villainService.updateVillain(
          this.villainModel.villain.getVillain()
        );
      }
    });
  }
}
