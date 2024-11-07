import { Component, Input, OnInit } from '@angular/core';
import { heroDAO } from '../../../DAO/hero.DAO';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { HeroService } from '../../../Service/hero.service';
import { Hero } from '../../../Model/Domain/hero';
import { InMemoryDataService } from '../../../Service/in-memory-data.service';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponentHeroe implements OnInit {
  model: any;
  heroName: any;
  heroForm: any;
  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private HeroDao: heroDAO,
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
    age;

    if (!name || !age || !power) {
      return;
    }
    //añadir favourite
    this.HeroDao.getHeroes().subscribe((heroes) => {
      const lastHero = heroes[heroes.length - 1];
      const newId = lastHero ? lastHero.id + 1 : 1;
      // mirar
      // const newHero: Hero = {
      //   id: newId,
      //   name,
      //   age,
      //   power,
      //   favourite,
      //   lastName,
      //   alterEgo,
      // };

      // this.heroService.addHero(newHero);
      this.goBack();
    });
  }
  goBack(): void {
    this.router.navigate(['/heroes']);
  }
}
