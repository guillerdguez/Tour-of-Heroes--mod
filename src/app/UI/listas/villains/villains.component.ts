import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Villain } from '../../../Model/Domain/villano';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { VillainService } from '../../../Service/villain.service';
import { FechoriaDialogComponent } from '../../fechoria-dialog/fechoria-dialog.component';

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
  providers: [DialogService],
})
export class VillainsComponent implements OnInit {
  title: string = 'Villains';
  items: MenuItem[] = [];
  opciones: any[] = [];
  selectedItem: Villain[] = [];
  selectedTable: Villain[] = [];
  selectedOption!: string;
  ref!: DynamicDialogRef;

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private router: Router,
    private messageService: MessageService,

    public dialogService: DialogService
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
        command: () => this.showDialog(),
      },
    ];
  }
  //repetido
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
        label: 'Cambiar Fechoria',
        icon: 'pi pi-thumbs-down-fill',
        command: () => this.showDialog(),
      },
    ];
  }
  showDialog() {
    this.ref = this.dialogService.open(FechoriaDialogComponent, {});

    this.ref.onClose.subscribe((fechoria: string) => {
      if (fechoria) {
        this.changeFechoria(fechoria);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  changeFechoria(fechoria: string): void {
    if (this.selectedItem.length != 0) {
      this.selectedItem.forEach((item) => {
        item.fechoria = fechoria;
        this.villainService.updateVillain(item);
      });
      this.selectedItem = [];
    } else {
      this.selectedTable.forEach((item) => {
        item.fechoria = fechoria;
        this.villainService.updateVillain(item);
      });
    }
  }

  onItemSelected(item: Villain[]) {
    this.selectedItem = item;
  }

  onOptionSelect(select: string) {
    this.selectedOption = select;
    if (this.selectedOption.toLowerCase() == 'create') {
      this.router.navigate(['/newVillains']);
    }
  }

  onTableSelected(selectedItems: Villain[]) {
    this.selectedTable = [...selectedItems];
  }
  goToDetail(villain: Villain[]) {
    if (villain.length != 1) {
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
}
