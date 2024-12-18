import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../Model/Domain/hero';
import { heroDAO } from '../DAO/hero.DAO';
import { HeroModel } from '../Model/Views/Dynamic/HeroModel';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { PersonaModel } from '../Model/Views/Dynamic/PersonaModel';
import { DialogService } from 'primeng/dynamicdialog';
import { PowerModel } from '../Model/Views/Dynamic/powerModel';
@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(
    private heroDAO: heroDAO,
    private heroModel: HeroModel,
    private messageService: MessageService,
    private router: Router,
    private personaModel: PersonaModel,
    private powerModel: PowerModel,
    private dialogService: DialogService
  ) {}

  /////////// CREATE methods ///////////

  /** POST: add a new hero to the server */
  addHero(hero: any): void {
    this.heroModel.heroes.push(hero);

    this.heroDAO.addHero(hero).subscribe({
      next: (hero: Hero) => {
        this.heroModel.hero = hero;
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

  /** GET heroes from the server */
  getHeroes(): void {
    this.heroDAO.getHeroes().subscribe({
      next: (heroes: Hero[]) => {
        this.heroModel.heroes = heroes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  createHero(heroData: Hero): Hero {
    return new Hero(
      this,
      this.heroModel,
      this.router,
      this.personaModel,
      this.powerModel,
      this.dialogService
    ).setDetails(heroData);
  }
  private heroes: Hero[] = [];

  getHeroesArray(): Hero[] {
    this.personaModel.personas = [];

    this.heroDAO.getHeroes().subscribe({
      next: (heroes: any[]) => {
        let aux: Hero[] = [];

        heroes.forEach((hero) => aux.push(this.createHero(hero)));

        this.heroModel.heroes = aux;
        this.personaModel.personas = aux;
      },
      error: (error) => {
        console.error(error);
      },
    });

    return this.heroes;
  }

  getHeroesSubscription(): Observable<Hero[]> {
    return this.heroDAO.getHeroes();
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404(id: number): void {
    this.heroDAO.getHeroNo404(id).subscribe({
      next: (h: Hero | undefined) => {
        this.heroModel.hero = h ? h : undefined;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): void {
    this.heroDAO.getHero(id).subscribe({
      next: (hero: Hero) => {
        this.heroModel.hero = hero;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /** Search heroes by name */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.heroDAO.searchHeroes(term);
  }

  /////////// UPDATE methods ///////////

  /** PUT: update the hero on the server */
  updateHero(hero: any): void {
    this.heroDAO.updateHero(hero).subscribe({
      next: (hero: Hero) => {
        this.heroModel.hero = hero;
        this.personaModel.personas = this.personaModel.personas.filter(
          (persona) => (persona as Hero).favourite === hero.favourite
        );
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'Data Saved',
        // });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      },
    });
  }

  /////////// DELETE methods ///////////

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): void {
    this.heroDAO.deleteHero(id).subscribe({
      next: (hero: Hero) => {
        this.heroModel.hero = hero;
        this.personaModel.personas = this.personaModel.personas.filter(
          (persona) => persona.id !== id
        );

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
