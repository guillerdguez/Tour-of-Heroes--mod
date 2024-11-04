import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Villain } from '../Model/Domain/villano';
import { villainDAO } from '../DAO/villain.DAO';
import { VillainModel } from '../Model/Views/Dynamic/VillainModel';
import { MessageService } from 'primeng/api';
@Injectable({ providedIn: 'root' })
export class VillainService {
  constructor(
    private villainDAO: villainDAO,
    private villainModel: VillainModel,
    private messageService: MessageService
  ) {}

  /////////// CREATE methods ///////////

  /** POST: add a new villain to the server */
  addVillain(villain: Villain): void {
    this.villainModel.villains.push(villain);

    this.villainDAO.addVillain(villain).subscribe({
      next: (villain: Villain) => {
        this.villainModel.villain = villain;
      },
      error: (error) => {
        console.error(error);
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
    this.villainDAO.getVillains().subscribe({
      next: (villains: Villain[]) => {
        this.villainModel.villains = villains;
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
  updateVillain(villain: Villain): void {
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
        console.error(error);
      },
    });
  }

  /////////// DELETE methods ///////////

  /** DELETE: delete the villain from the server */
  deleteVillain(id: number): void {
    this.villainDAO.deleteVillain(id).subscribe({
      next: (villain: Villain) => {
        this.villainModel.villain = villain;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deleted',
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
