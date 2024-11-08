import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { VillainService } from '../../Service/villain.service';
import { FechoriaDialogComponent } from '../../UI/fechoria-dialog/fechoria-dialog.component';
import { VillainModel } from '../Views/Dynamic/VillainModel';
import { PersonaConPoderes } from './personaConPoderes';
import { Injectable } from '@angular/core';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';

@Injectable({ providedIn: 'root' })
export class Villain extends PersonaConPoderes {
  fechoria!: string;
  title: string = 'Villains';
  ref!: DynamicDialogRef;
  url: string = '/newVillains';
  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    public override router: Router,
    private messageService: MessageService,
    public override personaModel: PersonaModel // public dialogService: DialogService
  ) {
    super(router, personaModel);
  }

  // setDialogService(dialogService: DialogService) {
  //   this.dialogService = dialogService;
  //   return this;
  // }

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
      command: () => alert('llega'),
      // this.showDialog()
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
  //fechorias

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
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'It can only be edited if there is a single hero selected',
    // });
    this.router.navigate(['/detail/villain/', this.id]);
  }

  //mirar
  override delete(): void {
    this.villainModel.villains = this.villainModel.villains.filter(
      (h) => h.id !== this.id
    );

    this.villainService.deleteVillain(this.id);
  }

  // override presentable(): boolean {
  //   throw new Error('Method not implemented.');
  // }
}
