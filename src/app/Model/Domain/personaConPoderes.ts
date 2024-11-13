import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { PowerDialogComponent } from '../../UI/power-dialog /power-dialog.component';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';
import { PowerModel } from '../Views/Dynamic/powerModel';

export abstract class PersonaConPoderes {
  id!: number;
  name!: string;
  alterEgo?: string;
  lastName?: string;
  age!: number;
  power!: string;
  ref!: DynamicDialogRef;
  [key: string]: any;

  constructor(
    public router: Router,
    public personaModel: PersonaModel,
    public dialogService: DialogService,
    public powerModel: PowerModel
  ) {}

  setDetails(heroData: any) {
    this.id = heroData.id;
    this.name = heroData.name;
    this.lastName = heroData.lastName;
    this.age = heroData.age;
    this.power = heroData.power;
    this.alterEgo = heroData.alterEgo;
    return this;
  }

  getMenuItems(url: string) {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => this.router.navigate([url]),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(),
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => this.goToDetail(),
      },
    ];
  }

  getMenuItemOptions() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.personaModel.menuItemSeleccionado = 'Create';
          this.personaModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.personaModel.menuItemSeleccionado = 'Delete';
          this.personaModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          this.personaModel.menuItemSeleccionado = 'Edit';
          this.personaModel.ejecutarMenuItem();
        },
      },
    ];
  }

  getHeaders() {
    return [
      { field: 'id', header: 'Id', type: 'number' },
      { field: 'name', header: 'Name' },
      { field: 'lastName', header: 'LastName' },
      { field: 'age', header: 'Age', type: 'number' },
      { field: 'power', header: 'Power' },
      { field: 'alterEgo', header: 'AlterEgo' },
    ];
  }

  showDialogPower() {
    this.ref = this.dialogService.open(PowerDialogComponent, {});
    if (this.ref) {
      let copiaLista: PersonaConPoderes[] =
        this.personaModel.personasSeleccionadas;
      this.ref.onClose.subscribe((power: string) => {
        if (copiaLista.length === 0) {
          this.changePower(power);
        } else {
          copiaLista.forEach((persona) => {
            persona.changePower(power);
          });
        }
      });
    }
  }

  changePower(power: string | undefined): void {
    if (power !== undefined) {
      this.power = power;
      this.powerModel.powerGlobal = this.power;
    }
  }

  abstract delete(): void;
  abstract goToDetail(): void;
  abstract getUrl(): string;
}
