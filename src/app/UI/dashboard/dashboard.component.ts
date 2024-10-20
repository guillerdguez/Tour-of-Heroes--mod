import { Component, OnInit } from '@angular/core';
import { Hero } from '../../Model/Domain/hero';
import { HeroService } from '../../Service/hero.service';
import { HeroModel } from '../../Model/Views/Dynamic/HeroModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
selectedHero: Hero | undefined;

  constructor(private heroService: HeroService, public heroModel: HeroModel) {}

  ngOnInit(): void {

    this.heroService.getHeroesSubscription().subscribe(
        {
          next: (heroes) =>{
            this.heroes = heroes.slice(0,4);
          }
        }
    );
  }
  getHeroes(): void {
   
  }
}
