import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PowerModel {
  powers: string[] = [
    'Really Smart',
    'Super Flexible',
    'Super ',
    'Weather Changer',
    'Invisibility',
    'Flight',
    'Super Strength',
    'Telepathy',
    'Time Manipulation',
    'Mind Control',
  ];
  power: string | undefined;
}
