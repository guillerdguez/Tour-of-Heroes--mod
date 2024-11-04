import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VillainService } from '../../../Service/villain.service';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { Villain } from '../../../Model/Domain/villano';
import { MenuItem, MessageService } from 'primeng/api';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';

@Component({
  selector: 'app-villains',
  template: `
    <h2 class="title">{{ title }}</h2>
    <div *ngIf="villainModel.villains.length > 0">
      <app-select-form
        [options]="opciones"
        (OptionSelect)="onOptionSelect($event)"
        [isTableEmpty]="selectedTable.length == 0"
      ></app-select-form>

      <app-esquema-lista
        [title]="title"
        [params]="villainModel.villains"
        [items]="items"
        (itemSelected)="onItemSelected($event)"
        (TableSelected)="onTableSelected($event)"
      ></app-esquema-lista>
    </div>
    <div *ngIf="villainModel.villains.length === 0">
      <h2 class="title">Sin resultados</h2>
    </div>
  `,
})
export class VillainsComponent implements OnInit {
  title: string = 'Villains';
  items: MenuItem[] = [];
  opciones: any[] = [];
  selectedItem: Villain[] = [];
  selectedTable: Villain[] = [];
  selectedOption!: string;

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private router: Router,
    private fechoriaModel: FechoriaModel,
    private messageService: MessageService
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
        separator: true,
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
        command: () => this.delete(this.selectedTable),
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => this.goToDetail(this.selectedTable),
      },
      {
        separator: true,
      },
      {
        label: 'Cambiar Fechoria',
        icon: 'pi pi-thumbs-down-fill',

        items: this.getFechoriaItems(),
      },
    ];
  }

  getFechoriaItems(): MenuItem[] {
    return this.fechoriaModel.fechorias.map((fechoria) => ({
      label: fechoria,
      command: () => this.changeFechoria(fechoria),
    }));
  }

  changeFechoria(fechoria: string): void {
    this.selectedItem.forEach((item) => {
      item.fechoria = fechoria;
      this.villainService.updateVillain(item);
    });
  }

  onItemSelected(item: Villain[]) {
    this.selectedItem = item;
  }

  onOptionSelect(select: string) {
    this.selectedOption = select;
    this.switchOpciones(this.selectedOption);
  }

  onTableSelected(selectedItems: Villain[]) {
    this.selectedTable = [...selectedItems];
  }

  goToDetail(villain: Villain[]) {
    if (this.selectedTable.length != 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'It can only be edited if there is a single hero selected',
      });
    } else {
      this.router.navigate(['/detail/villain/', villain[0].id]);
    }
  }

  delete(villain: Villain[]): void {
    villain.forEach((item) => {
      this.villainModel.villains = this.villainModel.villains.filter(
        (h) => h.id !== item.id
      );
      this.villainService.deleteVillain(item.id);
    });
    this.selectedItem = [];
    this.selectedTable = [];
  }

  switchOpciones(selectedOption: string) {
    if (this.selectedOption != undefined) {
      if (
        selectedOption.toLowerCase() == 'edit' &&
        this.selectedTable.length != 1
      ) {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'It can only be edited if there is a single hero selected',
        });
      } else {
        switch (selectedOption.toLowerCase()) {
          case 'create':
            this.router.navigate(['/newVillains']);
            break;
          case 'delete':
            this.delete(this.selectedTable);
            break;
          case 'edit':
            this.router.navigate(['/detail/hero/' + this.selectedTable[0].id]);
            break;
          case 'cambiar fechoria':
            this.changeFechoria(this.selectedItem[0]?.fechoria);
            break;
          default:
            console.error('Opción no válida:', selectedOption);
        }
      }
    }
  }
}
