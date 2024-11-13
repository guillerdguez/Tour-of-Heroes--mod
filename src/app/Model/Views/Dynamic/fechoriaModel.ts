import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FechoriaModel {
  fechorias: string[] = [
   'Robó el banco nacional' ,
   'Secuestró al alcalde' ,
   'Destruyó el monumento histórico' ,
   'Hackeó los sistemas del gobierno' ,
   'Causó un apagón masivo' ,
   'Envenenó el suministro de agua' ,
   'Incendió la biblioteca pública' ,
   'Rompió la barrera del tiempo' ,
   'Controla la mente del presidente' ,
   'Desató una tormenta eterna' ,
  ];
  fechoriaGlobal: string | undefined;
  fechoria: string | undefined;
}
