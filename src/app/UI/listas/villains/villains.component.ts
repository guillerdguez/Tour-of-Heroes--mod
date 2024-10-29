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
      [items]="items"
      [options]="opciones"
      (itemSelected)="onItemSelected($event)"
      (TableSelected)="onTableSelected($event)"
      (OptionSelect)="onOptionSelect($event)"
    ></app-esquema-lista>
  `,
})
export class VillainsComponent implements OnInit {
  title: string = 'Villains';
  items: MenuItem[] = [];
  selectedItem!: Villain[];
  opciones: any[] = [];

  selectedTable!: Villain[];
  selectedOption!: string;
  villainTemporal!: Villain[];

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private router: Router,
    private fechoriaModel: FechoriaModel
  ) {}
  ngOnInit(): void {
    this.villainModel.villains = this.villainService.getVillainsArray();
    this.items = this.menuItem();
    this.opciones = this.menuOpciones();
  }
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
  menuOpciones() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => this.router.navigate(['/newVillains']),
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
    for (let i = 0; i < this.selectedItem.length; i++) {
      this.selectedItem[i].fechoria = fechoria;

      this.villainService.updateVillain(this.selectedItem[i]);
    }
  }

  onItemSelected(item: Villain[]) {
    this.selectedItem = item;
  }

  onOptionSelect(select: string) {
    this.selectedOption = select;
    this.switchOpciones(this.selectedOption);
  }

  onTableSelected(item: Villain[]) {
    this.selectedTable = item;
  }
  goToDetail(villain: Villain[]) {
    this.router.navigate(['/detail/villain/', villain[0].id]);
    this.selectedTable = [];
    this.selectedOption = '';
  }

  delete(villain: Villain[]): void {
    for (let i = 0; i < villain.length; i++) {
      this.villainModel.villains = this.villainModel.villains.filter(
        (h) => h.id !== villain[i].id
      );
      this.villainService.deleteVillain(villain[i].id);
    }
    this.selectedTable = [];
    this.selectedOption = '';
  }

  // switchOpciones(selectedOption: string) {
  //   const options = [
  //     {
  //       label: 'Create',
  //       action: () => this.router.navigate(['/newVillains']),
  //     },
  //     {
  //       label: 'Delete',
  //       action: () => this.delete(this.selectedItem),
  //     },
  //     {
  //       label: 'Edit',
  //       action: () => {
  //         if (this.selectedTable.length !== 1) {
  //           alert('Solo se puede editar si hay un solo villano seleccionado');
  //         } else {
  //           this.goToDetail(this.selectedItem);
  //         }
  //       },
  //     },
  //     {
  //       label: 'Cambiar Fechoria',
  //       action: () => this.changeFechoria(this.selectedItem[0].fechoria),
  //     },
  //   ];

  //   const selected = options.find(
  //     (option) => option.label.toLowerCase() === selectedOption.toLowerCase()
  //   );

  //   if (selected) {
  //     selected.action();
  //   } else {
  //     console.error('Opción no válida:', selectedOption);
  //   }
  // }

  switchOpciones(selectedOption: string) {
    if (this.selectedOption != undefined) {
      if (
        selectedOption.toLowerCase() == 'edit' &&
        this.selectedTable.length != 1
      ) {
        alert('It can only be edited if there is a single villain selected');
      } else {
        switch (selectedOption.toLowerCase()) {
          case 'create':
            this.router.navigate(['/newVillains']);
            break;
          case 'delete':
            this.delete(this.selectedTable);
            break;

          case 'edit':
            this.router.navigate([
              '/detail/villain/' + this.selectedTable[0].id,
            ]);

            break;
          case 'Cambiar Fechoria':
            this.changeFechoria(this.selectedItem[0].fechoria);
            break;

          default:
            console.error('Opción no válida:', selectedOption);
        }
      }
    }
  }
}
