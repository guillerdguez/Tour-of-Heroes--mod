import { Injectable } from '@angular/core';
import { Fechoria } from '../../Domain/fechoria';

@Injectable({ providedIn: 'root' })
export class FechoriaModel {
  fechorias: Fechoria[] = [
    { name: 'Robó el banco nacional' },
    { name: 'Secuestró al alcalde' },
    { name: 'Destruyó el monumento histórico' },
    { name: 'Hackeó los sistemas del gobierno' },
    { name: 'Causó un apagón masivo' },
    { name: 'Envenenó el suministro de agua' },
    { name: 'Incendió la biblioteca pública' },
    { name: 'Rompió la barrera del tiempo' },
    { name: 'Controla la mente del presidente' },
    { name: 'Desató una tormenta eterna' },
  ];
  fechoriaGlobal: string | undefined;
  fechoria: string | undefined;
}
