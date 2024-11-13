import { Injectable } from '@angular/core';
import { Hero } from '../../Domain/hero';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class HeroModel {
  heroes: Hero[] = [];
  hero: Hero | undefined;
}
