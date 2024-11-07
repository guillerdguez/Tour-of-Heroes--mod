import { Injectable } from '@angular/core';
import { Villain } from '../../Domain/villain';

@Injectable({ providedIn: 'root' })
export class VillainModel {
  villains: Villain[] = [];
  villain: Villain | undefined;
}
