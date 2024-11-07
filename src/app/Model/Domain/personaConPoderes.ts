import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

export abstract class PersonaConPoderes {
  id!: number;
  name!: string;
  alterEgo?: string;
  lastName?: string;
  age!: number;
  power!: string;

  constructor(public router: Router) {}

  setDetails(heroData: any) {
    this.id = heroData.id;
    this.name = heroData.name;
    this.lastName = heroData.lastName;
    this.age = heroData.age;
    this.power = heroData.power;
    this.alterEgo = heroData.alterEgo;
    return this;
  }

  menuItem(url: string | undefined) {
   
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
      {
        separator: true,
      },
    ];
  }
  abstract delete(): void;
  abstract goToDetail(): void;
  // abstract presentable(): boolean;
  abstract getHeaders(): any[];
}
