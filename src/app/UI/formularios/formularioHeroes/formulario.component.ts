import { Component, OnInit } from '@angular/core';
import { heroDAO } from '../../../DAO/hero.DAO';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { HeroService } from '../../../Service/hero.service';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { Router } from '@angular/router';
import { HeroDetails } from '../../../Model/Domain/hero-details';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponentHeroe implements OnInit {
  heroName: string = '';
  heroAge: number = 0;
  heroPower: string = '';
  heroFavourite: boolean = false;
  heroAlterEgo?: string = '';
  heroLastName?: string = '';

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private heroDao: heroDAO, 
    public powerModel: PowerModel,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.powerModel.powers;
  }

  add(
    name: string,
    age: number,
    power: string,
    favourite: boolean,
    alterEgo?: string,
    lastName?: string
  ): void {
    name = name.trim();
    alterEgo = alterEgo?.trim() === '' ? undefined : alterEgo?.trim();
    lastName = lastName?.trim() === '' ? undefined : lastName?.trim();
    power = power.trim();

    if (!name || !age || !power) {
      return; 
    }

    this.heroDao.getHeroes().subscribe((heroes) => {
      const lastHero = heroes[heroes.length - 1];
      const newId = lastHero ? lastHero.id + 1 : 1;

      const newHero: HeroDetails = {
        id: newId,
        name,
        age,
        power,
        favourite,
        lastName,
        alterEgo,
      };

      this.heroService.addHero(newHero);

      this.goBack();
    });
  }

  goBack(): void {
    this.router.navigate(['/heroes']); 
  }
}
