import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../Model/Domain/hero';
import { Villain } from '../Model/Domain/villano';
import { PowerModel } from '../Model/Views/Dynamic/powerModel';
import { FechoriaModel } from '../Model/Views/Dynamic/fechoriaModel';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor(
    public powerModel: PowerModel,
    public fechoriaModel: FechoriaModel
  ) {}
  // createPowers() {
  //   return [
  //     'Really Smart',
  //     'Super Flexible',
  //     'Super Hot',
  //     'Weather Changer',
  //     'Invisibility',
  //     'Flight',
  //     'Super Strength',
  //     'Telepathy',
  //     'Time Manipulation',
  //     'Mind Control',
  //   ];
  // }

  // createFechorias() {
  //   return [
  //     'Robó el banco nacional',
  //     'Secuestró al alcalde',
  //     'Destruyó el monumento histórico',
  //     'Hackeó los sistemas del gobierno',
  //     'Causó un apagón masivo',
  //     'Envenenó el suministro de agua',
  //     'Incendió la biblioteca pública',
  //     'Rompió la barrera del tiempo',
  //     'Controla la mente del presidente',
  //     'Desató una tormenta eterna',
  //   ];
  // }

  createDb() {
    const powers = this.powerModel.powers;
    const fechorias = this.fechoriaModel.fechorias;

    const heroes: Hero[] = [
      {
        id: 12,
        name: 'Dr. Nice',
        lastName: 'Smith',
        age: 35,
        power: powers[0],
        alterEgo: 'Pablo',
      },
      {
        id: 13,
        name: 'Bombasto',
        lastName: 'Jones',
        age: 42,
        power: powers[1],
        alterEgo: 'Jose',
      },
      {
        id: 14,
        name: 'Celeritas',
        lastName: undefined,
        age: 29,
        power: powers[2],
        alterEgo: undefined,
      },
      {
        id: 15,
        name: 'Magneto',
        lastName: 'Rodriguez',
        age: 50,
        power: powers[3],
        alterEgo: 'Paco',
      },
      {
        id: 16,
        name: 'RubberMan',
        lastName: undefined,
        age: 28,
        power: powers[1],
        alterEgo: undefined,
      },
      {
        id: 17,
        name: 'Dynama',
        lastName: undefined,
        age: 30,
        power: powers[0],
        alterEgo: undefined,
      },
      {
        id: 18,
        name: 'Dr. IQ',
        lastName: 'Lopez',
        age: 40,
        power: powers[0],
        alterEgo: 'Chuck',
      },
      {
        id: 19,
        name: 'Magma',
        lastName: 'Ruiz',
        age: 36,
        power: powers[2],
        alterEgo: 'Pablo',
      },
      {
        id: 20,
        name: 'Tornado',
        lastName: undefined,
        age: 33,
        power: powers[3],
        alterEgo: undefined,
      },
    ];

    const villains: Villain[] = [
      {
        id: 21,
        name: 'DoomMaster',
        lastName: 'Graves',
        age: 45,
        power: powers[4],
        fechoria: fechorias[0],
        alterEgo: 'Marcus',
      },
      {
        id: 22,
        name: 'MindBender',
        lastName: 'Quinn',
        age: 38,
        power: powers[9],
        fechoria: fechorias[1],
        alterEgo: 'Sophia',
      },
      {
        id: 23,
        name: 'Tempest',
        lastName: 'Storm',
        age: 42,
        power: powers[3],
        fechoria: fechorias[9],
        alterEgo: 'Edward',
      },
      {
        id: 24,
        name: 'Shade',
        lastName: 'Black',
        age: 30,
        power: powers[4],
        fechoria: fechorias[2],
        alterEgo: 'Lara',
      },
      {
        id: 25,
        name: 'Chronos',
        lastName: 'Evans',
        age: 55,
        power: powers[8],
        fechoria: fechorias[7],
        alterEgo: 'Walter',
      },
      {
        id: 26,
        name: 'Inferno',
        lastName: undefined,
        age: 29,
        power: powers[2],
        fechoria: fechorias[5],
        alterEgo: 'Carlos',
      },
      {
        id: 27,
        name: 'Titan',
        lastName: undefined,
        age: 40,
        power: powers[6],
        fechoria: fechorias[6],
        alterEgo: 'Olaf',
      },
      {
        id: 28,
        name: 'Black Widow',
        lastName: 'Carter',
        age: 32,
        power: powers[5],
        fechoria: fechorias[4],
        alterEgo: 'Natasha',
      },
      {
        id: 29,
        name: 'Specter',
        lastName: 'Phantom',
        age: 28,
        power: powers[4],
        fechoria: fechorias[3],
        alterEgo: 'Victor',
      },
      {
        id: 30,
        name: 'Nightmare',
        lastName: undefined,
        age: 37,
        power: powers[9],
        fechoria: fechorias[8],
        alterEgo: 'Samuel',
      },
    ];

    return { heroes, villains };
  }

  // genId(heros: Hero[]): number {
  //   return heros.length > 0
  //     ? Math.max(...heros.map((hero) => hero.id)) + 1
  //     : 11;
  // }

  // genIdVillanos(villains: Villain[]): number {
  //   return villains.length > 0
  //     ? Math.max(...villains.map((villain) => villain.id)) + 1
  //     : 21;
  // }
}
