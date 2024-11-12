import { Injectable } from '@angular/core';
import { PersonaConPoderes } from '../../Domain/personaConPoderes';
import { FechoriaModel } from './fechoriaModel';
@Injectable({ providedIn: 'root' })
export class PersonaModel {
  
  constructor(public fechoriaModel: FechoriaModel) {}
  personas: PersonaConPoderes[] = [];
  persona: PersonaConPoderes | undefined;
  personasSeleccionadas: PersonaConPoderes[] = [];
  menuItemSeleccionado!: any;


  ejecutarMenuItem() {
    this.personasSeleccionadas.forEach((persona) => {
      if (this.menuItemSeleccionado) {
        let opciones = persona.menuItem(persona.getUrl());

        let opcion = opciones.find(
          (opcion) => opcion.label == this.menuItemSeleccionado
        );

        opcion?.command();
      }
    });
    this.personasSeleccionadas = [];

    this.fechoriaModel.fechoriaGlobal = undefined;
 
  }
}
