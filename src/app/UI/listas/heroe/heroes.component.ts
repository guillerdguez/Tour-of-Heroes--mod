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
      (TableSelected)="onTableSelected($event)"
      (OptionSelecet)="onOptionSelecet($event)"
    ></app-esquema-lista>
  `,
})
export class HeroesComponent implements OnInit, OnChanges {
  title: string = 'Heroes';
  items: MenuItem[] = [];
  opciones: any[] = [];
  selectedItem!: Hero;
  selectedTable!: Hero;
  selectedOption!: string;
  heroTemporal!: Hero;

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

  ngOnChanges(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
  }

  // menuItem() {
  //   return [
  //     {
  //       label: 'Create',
  //       icon: 'pi pi-plus',
  //       command: () => this.router.navigate(['/newHeroes']),
  //     },
  //     {
  //       label: 'Delete',
  //       icon: 'pi pi-trash',
  //       command: () => this.delete(this.selectedItem),
  //     },
  //     {
  //       label: 'Edit',
  //       icon: 'pi pi-file-edit',
  //       command: () => this.goToDetail(this.selectedItem),
  //     },
  //     {
  //       label: 'quitar de top',
  //       icon: 'pi pi-angle-double-down',
  //       command: () => this.ultimaPosicion(this.selectedItem),
  //     },
  //   ];
  // }
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
        label: 'top',
        icon: 'pi pi-crown',
        items: [
          {
            label: 'poner en top',
            icon: 'pi pi-angle-double-up',
            command: () => this.primeraPosicion(this.selectedItem),
          },
          {
            label: 'quitar de top',
            icon: 'pi pi-angle-double-down',
            command: () => this.ultimaPosicion(this.selectedItem),
          },
        ],
      },
    ];
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
        label: 'top',
        icon: 'pi pi-crown',
        items: [
          {
            label: 'poner en top',
            icon: 'pi pi-angle-double-up',
            command: () => this.primeraPosicion(this.selectedTable),
          },
          {
            label: 'quitar de top',
            icon: 'pi pi-angle-double-down',
            command: () => this.ultimaPosicion(this.selectedTable),
          },
        ],
      },
    ];
  }
  // menuOpciones() {
  //   return [
  //     {
  //       label: 'Create',
  //       icon: 'pi pi-plus',
  //       command: () => this.router.navigate(['/newHeroes']),
  //     },
  //     {
  //       label: 'Delete',
  //       icon: 'pi pi-trash',
  //       command: () => this.delete(this.selectedTable),
  //     },
  //     {
  //       label: 'Edit',
  //       icon: 'pi pi-file-edit',
  //       command: () => this.goToDetail(this.selectedTable),
  //     },
  //     {
  //       label: 'quitar de top',
  //       icon: 'pi pi-angle-double-down',
  //       command: () => this.ultimaPosicion(this.selectedTable),
  //     },
  //   ];
  // }

  onItemSelected(item: Hero) {
    this.selectedItem = item;
  }

  onTableSelected(item: Hero) {
    this.selectedTable = item;
  }

  onOptionSelecet(select: string) {
    this.selectedOption = select;
    console.log(select);
    this.switchOpciones(this.selectedOption);
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

  primeraPosicion(selectedItem: Hero) {
    if (selectedItem) {
      this.heroTemporal = selectedItem;
      this.heroModel.heroes.splice(
        this.heroModel.heroes.indexOf(selectedItem),
        1
      );
      this.heroModel.heroes.unshift(this.heroTemporal);
    }
  }

  ultimaPosicion(selectedItem: Hero) {
    if (selectedItem) {
      this.heroTemporal = selectedItem;
      this.heroModel.heroes.splice(
        this.heroModel.heroes.indexOf(selectedItem),
        1
      );
      this.heroModel.heroes.push(this.heroTemporal);
    }
  }
  switchOpciones(selectedOption: string) {
    if (this.selectedOption != undefined) {
      console.log(selectedOption);
      selectedOption = selectedOption.toLowerCase();
      switch (selectedOption.toLowerCase()) {
        case 'create':
          this.router.navigate(['/newHeroes']);

          break;

        case 'delete':
          this.delete(this.selectedTable);
          break;

        case 'edit':
          this.goToDetail(this.selectedTable);
          break;

        case 'quitar de top':
          this.ultimaPosicion(this.selectedTable);
          break;

        default:
          console.error('Opción no válida:', selectedOption);
      }
    }
  }
}
