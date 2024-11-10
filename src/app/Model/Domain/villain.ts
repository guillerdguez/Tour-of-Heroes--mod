import { Router } from '@angular/router'; 
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { VillainService } from '../../Service/villain.service';
import { FechoriaDialogComponent } from '../../UI/fechoria-dialog/fechoria-dialog.component';
import { VillainModel } from '../Views/Dynamic/VillainModel';
import { PersonaConPoderes } from './personaConPoderes';
import { Injectable } from '@angular/core';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';
import { VillainDetails } from './villain-details';

@Injectable({ providedIn: 'root' })
export class Villain extends PersonaConPoderes {
  fechoria!: string;
  title: string = 'Villains';
  ref!: DynamicDialogRef;
  url: string = '/newVillains';
  favourite: boolean = false;

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    public override router: Router, 
    public override personaModel: PersonaModel,
    private dialogService: DialogService
  ) {
    super(router, personaModel);
  }

  setDialogService(dialogService: DialogService) {
    this.dialogService = dialogService;
    return this;
  }

  override setDetails(villainData: any): any {
    super.setDetails(villainData);
    this.fechoria = villainData.fechoria;
    return this;
  }

  override menuItem() {
    let items: any[] = super.menuItem(this.url);
    items.push({
      label: 'Cambiar Fechoria',
      icon: 'pi pi-thumbs-down-fill',
      command: () => this.showDialog(),
    });
    return items;
  }

  override menuItemOptions() {
    let items: any[] = super.menuItemOptions();
    let cambiarFechoria = {
      label: 'Cambiar Fechoria',
      icon: 'pi pi-thumbs-down-fill',
      command: () => {
        this.personaModel.menuItemSeleccionado = 'Cambiar Fechoria';
        this.personaModel.ejecutarMenuItem();
      },
    };
    items.push(cambiarFechoria);

    return items;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getUrl() {
    return this.url;
  }

  override getHeaders() {
    return [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'lastName', header: 'LastName' },
      { field: 'age', header: 'Age' },
      { field: 'power', header: 'Power' },
      { field: 'alterEgo', header: 'AlterEgo' },
      { field: 'fechoria', header: 'Fechoria' },
    ];
  }

  showDialog() {
    // Attempt to open the dialog
    this.ref = this.dialogService.open(FechoriaDialogComponent, {});
  
    // Check if the dialog reference (`ref`) is created successfully
    if (this.ref && this.ref.onClose) {
      // Subscribe to the onClose event only if `onClose` is defined
      this.ref.onClose.subscribe((fechoria: string) => {
        if (fechoria) {
          this.changeFechoria(fechoria);
        }
      });
    } else {
      console.error("Failed to open dialog or onClose event is not available.");
    }
  }
  
  // showDialog() {
  //   this.ref = this.dialogService.open(FechoriaDialogComponent, {});
  //   this.ref.onClose.subscribe((fechoria: string) => {
  //     if (fechoria) {
  //       this.changeFechoria(fechoria);
  //     }
  //   });
  // }
  changeFechoria(fechoria: string): void {
    this.fechoria = fechoria;
    this.villainService.updateVillain(this);
  }

  override goToDetail() {
    this.router.navigate(['/detail/villain/', this.id]);
  }

  override delete(): void {
    this.villainModel.villains = this.villainModel.villains.filter(
      (h) => h.id !== this.id
    );

    this.villainService.deleteVillain(this.id);
  }

  getVillain(): VillainDetails {
    return {
      id: this.id,
      name: this.name,
      alterEgo: this.alterEgo,
      lastName: this.lastName,
      age: this.age,
      power: this.power,
      fechoria: this.fechoria 
    };
  }
}
