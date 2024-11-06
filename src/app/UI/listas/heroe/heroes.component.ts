import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../../Service/hero.service';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { Hero } from '../../../Model/Domain/hero';
import { MenuItem, MessageService } from 'primeng/api';
//como creas si no hay ni 1?
@Component({
  selector: 'app-heroes',
  template: `
    <h2 class="title">
      {{ title }}
    </h2>
    @if(heroModel.heroes.length > 0){
    <div class="continer">
      <app-select-form
        [items]="items"
        (ItemSelect)="onItemSelected($event)"
        [isTableEmpty]="selectedTable.length == 0"
      ></app-select-form>
      <app-esquema-lista
        [title]="title"
        [params]="heroModel.heroes"
        [items]="items"
        [toggleFavorite]="toggleFavorite.bind(this)"
        (itemSelected)="onItemSelected($event)"
        (TableSelected)="onTableSelected($event)"
      ></app-esquema-lista>
    </div>
    } @else {
    <h2 class="title">Sin resultados</h2>
    }
  `,
})
export class HeroesComponent implements OnInit {
  title: string = 'Heroes';
  items: MenuItem[] = [];

  selectedItem: Hero[] = [];
  selectedTable: Hero[] = [];

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
    this.items = this.menuItem();
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

  onItemSelected(item: any) {
    if(item.label=="Create"){
      this.router.navigate(['/newHeroes'])
    }
    this.selectedItem = item;
    
  }

  onTableSelected(selectedItems: Hero[]) {
    this.selectedTable = [...selectedItems];
  }

  goToDetail(hero: Hero[]) {
    if (hero.length == 0) {
      hero = this.selectedTable;
    }
    if (hero.length != 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'It can only be edited if there is a single hero selected',
      });
    } else {
      this.router.navigate(['/detail/hero/', hero[0].id]);
    }
  }

  delete(hero: Hero[]): void {
    if (hero.length == 0) {
      hero = this.selectedTable;
    } 
    hero.forEach((h) => {
      this.heroModel.heroes = this.heroModel.heroes.filter(
        (existing) => existing.id !== h.id
      );
      this.heroService.deleteHero(h.id);
    });
    this.selectedItem = [];
    this.selectedTable = [];
  }

  favourite(selectedItem: Hero[]) {
    if (selectedItem.length == 0) {
      selectedItem = this.selectedTable;
    }
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

      this.selectedTable = this.selectedTable.filter(
        (hero) => hero.id !== item.id
      );
    }
  }
}
