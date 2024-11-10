import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Villain } from '../Model/Domain/villain';
import { villainDAO } from '../DAO/villain.DAO';
import { VillainModel } from '../Model/Views/Dynamic/VillainModel';
import { MessageService } from 'primeng/api';
import { PersonaModel } from '../Model/Views/Dynamic/PersonaModel';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class VillainService {
  constructor(
    private villainDAO: villainDAO,
    private villainModel: VillainModel,
    private messageService: MessageService,
    private personaModel: PersonaModel,
    private router: Router,
    private dialogService: DialogService
  ) {}

  createVillain(villainData: any): Villain {
    return new Villain(
      this,
      this.villainModel,
      this.router,
      this.personaModel,
      this.dialogService
    ).setDetails(villainData);
  }
  /////////// CREATE methods ///////////

  /** POST: add a new villain to the server */
  addVillain(villain: Villain): void {
    this.villainModel.villains.push(villain);

    this.villainDAO.addVillain(villain).subscribe({
      next: (villain: Villain) => {
        this.villainModel.villain = villain;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Created',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      },
    });
  }

  /////////// READ methods ///////////

  /** GET villains from the server */
  getVillains(): void {
    this.villainDAO.getVillains().subscribe({
      next: (villains: Villain[]) => {
        this.villainModel.villains = villains;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  private villains: Villain[] = [];

  getVillainsArray(): Villain[] {
    this.personaModel.personas = [];
    this.villainDAO.getVillains().subscribe({
      next: (villains: any[]) => {
        let aux: Villain[] = [];

        villains.forEach((villain) => aux.push(this.createVillain(villain)));

        this.villainModel.villains = aux;
        this.personaModel.personas = aux;
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.villains;
  }

  getVillainsSubscription(): Observable<Villain[]> {
    return this.villainDAO.getVillains();
  }

  /** GET villain by id. Return `undefined` when id not found */
  getVillainNo404(id: number): void {
    this.villainDAO.getVillainNo404(id).subscribe({
      next: (h: Villain | undefined) => {
        this.villainModel.villain = h ? h : undefined;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /** GET villain by id. Will 404 if id not found */
  getVillain(id: number): void {
    this.villainDAO.getVillain(id).subscribe({
      next: (villain: Villain) => {
        this.villainModel.villain = villain;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /** Search villains by name */
  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.villainDAO.searchVillains(term);
  }

  /////////// UPDATE methods ///////////

  /** PUT: update the villain on the server */

  updateVillain(villain: any): void {
    this.villainDAO.updateVillain(villain).subscribe({
      next: (villain: Villain) => {
        this.villainModel.villain = villain;
        this.messageService.add({
           severity: 'success',
           summary: 'Success',
        detail: 'Data Saved',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      },
    });
  }

  /////////// DELETE methods ///////////

  /** DELETE: delete the villain from the server */
  deleteVillain(id: number): void {
    this.villainDAO.deleteVillain(id).subscribe({
      next: (villain: Villain) => {
        this.personaModel.personas = this.personaModel.personas.filter(
          (persona) => persona.id !== id
        );
        this.villainModel.villain = villain;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deleted',
        });
      },
      error: (error) => {
 
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      },
    });
  }
}
