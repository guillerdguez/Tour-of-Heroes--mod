import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';

export abstract class PersonaConPoderes {
  id!: number;
  name!: string;
  alterEgo?: string;
  lastName?: string;
  age!: number;
  power!: string;

  constructor(public router: Router, public personaModel: PersonaModel) {}

  setDetails(heroData: any) {
    this.id = heroData.id;
    this.name = heroData.name;
    this.lastName = heroData.lastName;
    this.age = heroData.age;
    this.power = heroData.power;
    this.alterEgo = heroData.alterEgo;
    return this;
  }

  menuItem(url: string) {
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

  menuItemOptions() {
    let crear = {
      label: 'Create',
      icon: 'pi pi-plus',
      command: () => {
        this.personaModel.menuItemSeleccionado = 'Create';
        this.personaModel.ejecutarMenuItem();
      },
    };
    let borrar = {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        this.personaModel.menuItemSeleccionado = 'Delete';
        this.personaModel.ejecutarMenuItem();
      },
    };
    let editar = {
      label: 'Edit',
      icon: 'pi pi-file-edit',

      command: () => {
        this.personaModel.menuItemSeleccionado = 'Edit';
        this.personaModel.ejecutarMenuItem();
      },
    };
    return [crear, borrar, editar];
  }

  abstract delete(): void;
  abstract goToDetail(): void;
  // abstract presentable(): boolean;
  abstract getHeaders(): any[];
  abstract getUrl(): string;
}
