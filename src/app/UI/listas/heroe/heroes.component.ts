import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../../Service/hero.service';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { Hero } from '../../../Model/Domain/hero';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-heroes',
  template: `
    <app-esquema-lista
      *ngIf="heroModel.heroes.length > 0"
      [title]="title"
      [params]="heroModel.heroes"
      (delete)="delete($event)"
      (edit)="goToDetail($event)"
      [items]="items"
      [options]="opciones"
      (itemSelected)="onItemSelected($event)"
    ></app-esquema-lista>
  `,
})
export class HeroesComponent implements OnInit, OnChanges {
  title: string = 'Heroes';
  items: MenuItem[] = [];
  selectedItem!: Hero;
  opciones: any[] = [];

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
    this.items = this.menuItem();
    this.opciones = this.menuOpciones();
    console.log(this.opciones);
  }
  ngOnChanges(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
  }

  menuItem() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/newHeroes']);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.delete(this.selectedItem);
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          this.goToDetail(this.selectedItem);
        },
      },
      {
        label: 'top',
        icon: 'pi pi-crown',
        items: [
          {
            label: 'poner en top',
            icon: 'pi pi-angle-double-up',
            command: () => {
              this.primeraPosicion();
            },
          },
          {
            label: 'quitar de top',
            icon: 'pi pi-angle-double-down',
            command: () => {
              this.ultimaPosicion();
            },
          },
        ],
      },
    ];
  }

  onItemSelected(item: Hero) {
    this.selectedItem = item;
  }

  goToDetail(hero: Hero) {
    this.router.navigate(['/detail/hero/', hero.id]);
  }

  delete(hero: Hero): void {
    this.heroModel.heroes = this.heroModel.heroes.filter(
      (h) => h.id !== hero.id
    );
    this.heroService.deleteHero(hero.id);
  }

  heroTemporal!: Hero;
  primeraPosicion() {
    if (this.selectedItem) {
      this.heroTemporal = this.selectedItem;
      this.heroModel.heroes.splice(
        this.heroModel.heroes.indexOf(this.selectedItem),
        1
      );
      this.heroModel.heroes.unshift(this.heroTemporal);
    }
  }

  ultimaPosicion() {
    if (this.selectedItem) {
      this.heroTemporal = this.selectedItem;
      this.heroModel.heroes.splice(
        this.heroModel.heroes.indexOf(this.selectedItem),
        1
      );
      this.heroModel.heroes.push(this.heroTemporal);
    }
  }

  menuOpciones() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/newHeroes']);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.delete(this.selectedItem);
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          this.goToDetail(this.selectedItem);
        },
      },
      {
        label: 'top',
        icon: 'pi pi-crown',
        items: [
          {
            label: 'poner en top',
            icon: 'pi pi-angle-double-up',
            command: () => {
              this.primeraPosicion();
            },
          },
          {
            label: 'quitar de top',
            icon: 'pi pi-angle-double-down',
            command: () => {
              this.ultimaPosicion();
            },
          },
        ],
      },
    ];
  }
}
