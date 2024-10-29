import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../../Service/hero.service';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { Hero } from '../../../Model/Domain/hero';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-heroes',
  template: `<div *ngIf="heroModel.heroes.length > 0; else noHeroes">
      <app-esquema-lista
        [title]="title"
        [params]="heroModel.heroes"
        [items]="items"
        [options]="opciones"
        (itemSelected)="onItemSelected($event)"
        (TableSelected)="onTableSelected($event)"
        (OptionSelect)="onOptionSelect($event)"
      ></app-esquema-lista>
    </div>

    <ng-template #noHeroes>
      <h2 class="title ">Sin resultados</h2>
    </ng-template> `,
})
export class HeroesComponent implements OnInit {
  title: string = 'Heroes';
  items: MenuItem[] = [];
  opciones: any[] = [];
  selectedItem!: Hero[];
  selectedTable!: Hero[];
  selectedOption!: string;
  heroTemporal!: Hero;
  favouriteVariable!: Boolean;
  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
    this.items = this.menuItem();
    this.opciones = this.menuOpciones();
  }

  menuItem() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => this.router.navigate(['/newHeroes']),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(this.selectedItem),
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => this.goToDetail(this.selectedItem),
      },
      {
        label: 'favourite',
        icon: 'pi pi-star',

        command: () => this.favourite(this.selectedItem),
      },
    ];
  }
  favourite(selectedItem: Hero[]) {
    selectedItem.forEach((hero) => {
      const index = this.heroModel.heroes.indexOf(hero);
      this.heroModel.heroes[index].favourite = !hero.favourite;
      this.heroService.updateHero(this.heroModel.heroes[index]);
    });
  }

  menuOpciones() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => this.router.navigate(['/newHeroes']),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(this.selectedTable),
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => this.goToDetail(this.selectedTable),
      },
      {
        label: 'favourite',
        icon: 'pi pi-star',

        command: () => this.favourite(this.selectedTable),
      },
    ];
  }

  onItemSelected(item: Hero[]) {
    this.selectedItem = item;
  }

  onTableSelected(item: Hero[]) {
    this.selectedTable = item;
  }

  onOptionSelect(select: string) {
    this.selectedOption = select;
    this.switchOpciones(this.selectedOption);
  }

  goToDetail(hero: Hero[]) {
    this.router.navigate(['/detail/hero/', hero[0].id]);
    this.selectedTable = [];
    this.selectedOption = '';
  }

  delete(hero: Hero[]): void {
    for (let i = 0; i < hero.length; i++) {
      this.heroModel.heroes = this.heroModel.heroes.filter(
        (h) => h.id !== hero[i].id
      );
      this.heroService.deleteHero(hero[i].id);
    }
    this.selectedTable = [];
    this.selectedOption = '';
  }

  switchOpciones(selectedOption: string) {
    if (this.selectedOption != undefined) {
      if (
        selectedOption.toLowerCase() == 'edit' &&
        this.selectedTable.length != 1
      ) {
        alert('It can only be edited if there is a single hero selected');
      } else {
        switch (selectedOption.toLowerCase()) {
          case 'create':
            this.router.navigate(['/newHeroes']);
            break;
          case 'delete':
            this.delete(this.selectedTable);
            break;

          case 'favourite':
            this.favourite(this.selectedTable);
            break;
          default:
            console.error('Opción no válida:', selectedOption);
        }
      }
    }
  }
}
