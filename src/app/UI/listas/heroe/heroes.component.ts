import { Component, Input, input, OnInit } from '@angular/core';
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
      (itemSelected)="onItemSelected($event)"
    ></app-esquema-lista>
  `,
})
export class HeroesComponent implements OnInit {
  title: string = 'Heroes';
  items: MenuItem[] = [];
  selectedItem!: Hero;

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,

    private router: Router
  ) {}
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
              this.moveToFirstPosition();
            },
          },
          {
            label: 'quitar de top',
            icon: 'pi pi-angle-double-down',
            command: () => {
              this.moveToLastPosition();
            },
          },
        ],
      },
    ];
  }
  onItemSelected(item: Hero) {
    this.selectedItem = item;
  }

  ngOnInit(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
    this.items = this.menuItem();
    console.log(this.items);
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
  moveToFirstPosition() {
    if (this.heroModel.heroes.indexOf(this.selectedItem) > 4) {
      if (this.selectedItem) {
        this.heroModel.heroes = this.heroModel.heroes.filter(
          (h) => h.id !== this.selectedItem.id
        );

        this.heroModel.heroes.splice(0, 0, this.selectedItem);
      }
    }
  }
  moveToLastPosition() {
    if (
      this.heroModel.heroes.indexOf(this.selectedItem) !=
      this.heroModel.heroes.length - 1
    ) {
      if (this.selectedItem) {
        this.heroModel.heroes = this.heroModel.heroes.filter(
          (h) => h.id !== this.selectedItem.id
        );

        this.heroModel.heroes.splice(
          this.heroModel.heroes.length - 1,
          0,
          this.selectedItem
        );
        console.log(this.heroModel.heroes);
      }
    }
  }
}
