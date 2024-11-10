import { Injectable } from '@angular/core';
import { PersonaConPoderes } from '../../Domain/personaConPoderes';

@Injectable({ providedIn: 'root' })
export class PersonaModel {
  personas: PersonaConPoderes[] = [];
  persona: PersonaConPoderes | undefined;
  personaSeleccionadas: PersonaConPoderes[] = [];
  menuItemSeleccionado!: any;

  // this.messageService.add({
  //   severity: 'error',
  //   summary: 'Error',
  //   detail: 'It can only be edited if there is a single hero selected',
  // });

  ejecutarMenuItem() { 
    this.personaSeleccionadas.forEach((persona) => {
     
      if (this.menuItemSeleccionado) { 
        let opciones = persona.menuItem(persona.getUrl());
        let opcion = opciones.find(
          (opcion) => opcion.label == this.menuItemSeleccionado
        );
        opcion?.command();
      }
    });
    this.personaSeleccionadas = [];
  }
}
