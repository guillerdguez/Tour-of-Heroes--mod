import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../../Service/hero.service';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { Hero } from '../../../Model/Domain/hero';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-heroes',
  template: `
    <div *ngIf="heroModel.heroes.length > 0">
      <app-select-form
        [options]="opciones"
        (OptionSelect)="onOptionSelect($event)"
        [selectTable]="selectedTable"
      
      ></app-select-form>

      <app-esquema-lista
        [title]="title"
        [params]="heroModel.heroes"
        [items]="items"
        (itemSelected)="onItemSelected($event)"
        (TableSelected)="onTableSelected($event)"
        [toggleFavorite]="toggleFavorite.bind(this)"
      ></app-esquema-lista>
    </div>
    <div *ngIf="heroModel.heroes.length === 0">
      <h2 class="title">Sin resultados</h2>
    </div>
  `,
})
export class HeroesComponent implements OnInit {
  title: string = 'Heroes';
  items: MenuItem[] = [];
  opciones: any[] = [];
  selectedItem: Hero[] = [];
  selectedTable: Hero[] = [];
  selectedOption!: string;
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

  menuItem(): MenuItem[] {
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
        label: 'Favourite',
        icon: 'pi pi-star',
        command: () => this.favourite(this.selectedItem),
      },
    ];
  }

  menuOpciones(): MenuItem[] {
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
        label: 'Favourite',
        icon: 'pi pi-star',
        command: () => this.favourite(this.selectedTable),
      },
    ];
  }

  onOptionSelect(select: string) {
    this.selectedOption = select;
    this.switchOpciones(this.selectedOption);
  }


  onItemSelected(item: Hero[]) {
    this.selectedItem = item;
  }

  onTableSelected(selectedItems: Hero[]) {
    this.selectedTable = [...selectedItems];  
  }

  goToDetail(hero: Hero[]) {
    if (hero.length > 0) {
      this.router.navigate(['/detail/hero/', hero[0].id]);
    }
  }

  delete(hero: Hero[]): void {
    hero.forEach((h) => {
      this.heroModel.heroes = this.heroModel.heroes.filter(
        (existing) => existing.id !== h.id
      );
      this.heroService.deleteHero(h.id);
    });
  }

  favourite(selectedItem: Hero[]) {
    selectedItem.forEach((hero) => {
      const index = this.heroModel.heroes.indexOf(hero);
      if (index !== -1) {
        this.heroModel.heroes[index].favourite = !hero.favourite;
        this.heroService.updateHero(this.heroModel.heroes[index]);
      }
    });
  }

  toggleFavorite(item: Hero) {
    item.favourite = !item.favourite;
    const index = this.heroModel.heroes.findIndex(
      (hero) => hero.id === item.id
    );
    if (index !== -1) {
      this.heroModel.heroes[index] = { ...item };
      this.heroService.updateHero(this.heroModel.heroes[index]);
    }
  }
  switchOpciones(selectedOption: string) {
    if (this.selectedOption != undefined) {
      if (
        selectedOption.toLowerCase() == 'Edit' &&
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
            case 'edit':
              this.router.navigate([
                '/detail/hero/' + this.selectedTable[0].id,
              ]);
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
