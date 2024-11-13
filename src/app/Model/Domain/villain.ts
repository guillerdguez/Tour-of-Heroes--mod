import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { VillainService } from '../../Service/villain.service';
import { FechoriaDialogComponent } from '../../UI/fechoria-dialog/fechoria-dialog.component';
import { VillainModel } from '../Views/Dynamic/VillainModel';
import { PersonaConPoderes } from './personaConPoderes';
import { Injectable } from '@angular/core';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';
import { VillainDetails } from './villain-details';
import { FechoriaModel } from '../Views/Dynamic/fechoriaModel';
import { PowerModel } from '../Views/Dynamic/powerModel';

@Injectable({ providedIn: 'root' })
export class Villain extends PersonaConPoderes {
  fechoria?: string;
  title: string = 'Villains';
  url: string = '/newVillains';

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    public override router: Router,
    public override personaModel: PersonaModel,
    public override dialogService: DialogService,
    public fechoriaModel: FechoriaModel,
    public override powerModel: PowerModel
  ) {
    super(router, personaModel, dialogService, powerModel);
  }

  setDialogService(dialogService: DialogService) {
    this.dialogService = dialogService;
    return this;
  }

  override setDetails(villainData: any): this {
    super.setDetails(villainData);
    this.fechoria = villainData.fechoria;
    return this;
  }

  override getMenuItems() {
    let items: any[] = super.getMenuItems(this.url);
    items.push({
      label: 'Cambiar Fechoria',
      icon: 'pi pi-thumbs-down-fill',
      command: () => this.showDialog(),
    });
    return items;
  }

  override getMenuItemOptions() {
    let items: any[] = super.getMenuItemOptions();
    items.push({
      label: 'Cambiar Fechoria',
      icon: 'pi pi-thumbs-down-fill',
      command: () => {
        this.personaModel.menuItemSeleccionado = 'Cambiar Fechoria';
        this.personaModel.ejecutarMenuItem();
      },
    });
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
    let headers = super.getHeaders();
    headers.push({ field: 'fechoria', header: 'Fechoria' });
    return headers;
  }

  showDialog() {
    this.ref = this.dialogService.open(FechoriaDialogComponent, {});
    if (this.ref) {
      let copiaLista: PersonaConPoderes[] =
        this.personaModel.personasSeleccionadas;
      this.ref.onClose.subscribe((fechoria: string) => {
        if (copiaLista.length === 0) {
          this.changeFechoria(fechoria);
        } else {
          copiaLista.forEach((persona) => {
            if (persona instanceof Villain) {
              persona.changeFechoria(fechoria);
            }
          });
        }
      });
    }
  }

  changeFechoria(fechoria: string | undefined): void {
    if (fechoria !== undefined) {
      this.fechoria = fechoria;
      this.fechoriaModel.fechoriaGlobal = this.fechoria;
      const villainData = this.getVillain();
      this.villainService.updateVillain(villainData);
    }
  }
  
  override showDialogPower() {
    super.showDialogPower();
  }
  override changePower(power: string | undefined): void {
    super.changePower(power);
    const villainData = this.getVillain();
    this.villainService.updateVillain(villainData);
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
      fechoria: this.fechoria,
    };
  }
}
