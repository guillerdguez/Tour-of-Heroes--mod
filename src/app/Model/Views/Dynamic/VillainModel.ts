import { Injectable } from '@angular/core';
import { Villain } from '../../Domain/villain';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class VillainModel {
  villains: Villain[] = [];
  villain: Villain | undefined;
  // menuItemOptions: MenuItem[] = [];
}
