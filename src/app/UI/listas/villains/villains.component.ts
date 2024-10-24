import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VillainService } from '../../../Service/villain.service';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { Villain } from '../../../Model/Domain/villano';
import { MenuItem } from 'primeng/api';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';

@Component({
  selector: 'app-villains',
  template: `
    <app-esquema-lista
      *ngIf="villainModel.villains.length > 0"
      [title]="title"
      [params]="villainModel.villains"
      (delete)="delete($event)"
      (edit)="goToDetail($event)"
      [items]="items"
      (itemSelected)="onItemSelected($event)"
    ></app-esquema-lista>
  `,
})
export class VillainsComponent implements OnInit {
  title: string = 'Villains';
  items: MenuItem[] = [];
  selectedItem!: Villain;

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private router: Router,
    private fechoriaModel: FechoriaModel // Inyección del modelo de fechorías
  ) {}

  menuItem() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/newVillains']);
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
        label: 'Cambiar Fechoria',
        icon: 'pi pi-thumbs-down-fill',
        items: this.getFechoriaItems(),
      },
    ];
  }
  getFechoriaItems(): MenuItem[] {
    const menuItems: MenuItem[] = [];

    for (let i = 0; i < this.fechoriaModel.fechorias.length; i++) {
      const fechoria = this.fechoriaModel.fechorias[i];

      menuItems.push({
        label: fechoria,
        
        command: () => {
          this.changeFechoria(fechoria);
        },
      });
    }

    return menuItems;
  }

  changeFechoria(fechoria: string): void {
    if (this.selectedItem) {
      this.selectedItem.fechoria = fechoria;
      console.log(`Fechoria cambiada a: ${fechoria}`);
    } else {
      console.error('No se ha seleccionado ningún villano.');
    }
  }

  onItemSelected(item: Villain) {
    this.selectedItem = item;
  }

  ngOnInit(): void {
    this.villainModel.villains = this.villainService.getVillainsArray();
    this.items = this.menuItem();
    console.log(this.items);
  }

  goToDetail(villain: Villain) {
    this.router.navigate(['/detail/villain/', villain.id]);
  }

  delete(villain: Villain): void {
    this.villainModel.villains = this.villainModel.villains.filter(
      (h) => h.id !== villain.id
    );
    this.villainService.deleteVillain(villain.id);
  }
}
