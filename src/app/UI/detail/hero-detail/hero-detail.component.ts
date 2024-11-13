import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../../../Service/hero.service';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnChanges {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public heroModel: HeroModel,
    public powerModel: PowerModel,
    public fechoriaModel: FechoriaModel
  ) {}
  ngOnChanges(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id);  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    
    if (this.heroModel.hero) {
      this.heroService.updateHero(this.heroModel.hero);
      this.goBack();
    }
  }
}
