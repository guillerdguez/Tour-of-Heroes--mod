import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { VillainService } from '../../Service/villain.service';
import { FechoriaDialogComponent } from '../../UI/fechoria-dialog/fechoria-dialog.component';
import { VillainModel } from '../Views/Dynamic/VillainModel';
import { PersonaConPoderes } from './personaConPoderes';

export class Villain implements PersonaConPoderes {
  [key: string]: any;
  id!: number;
  name!: string;
  alterEgo?: string | undefined;
  lastName?: string | undefined;
  age!: number;
  power!: string;
  fechoria!: string;
  title: string = 'Villains';
  items: MenuItem[] = [];

  selectedItem: Villain[] = [];
  selectedTable: Villain[] = [];

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

  onItemSelected(item: any) {
    if (item.label == 'Create') {
      this.router.navigate(['/newVillains']);
    }
    this.selectedItem = item;
  }
  onTableSelected(selectedItems: Villain[]) {
    this.selectedTable = [...selectedItems];
  }
  goToDetail(villain: Villain[]) {
    if (villain.length == 0) {
      villain = this.selectedTable;
    }

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
    if (villain.length == 0) {
      villain = this.selectedTable;
    }

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
