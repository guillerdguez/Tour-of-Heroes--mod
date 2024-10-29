import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Hero } from '../../Model/Domain/hero';
import { HeroService } from '../../Service/hero.service';
import { HeroModel } from '../../Model/Views/Dynamic/HeroModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit,OnChanges {
 
  constructor(private heroService: HeroService, public heroModel: HeroModel) {}
  ngOnChanges( ): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
  }

  ngOnInit(): void {
 
    this.heroModel.heroes = this.heroService.getHeroesArray();
  } 
 
}
