import { Injectable } from '@angular/core';
import { PersonaConPoderes } from '../../Domain/personaConPoderes';

@Injectable({ providedIn: 'root' })
export class PersonaModel {
  personas: PersonaConPoderes[] = [];
  persona: PersonaConPoderes | undefined;
}
