import { PersonaConPoderes } from './personaConPoderes';

export interface Hero extends PersonaConPoderes {
  favourite: boolean;
  [key: string]: any;
}
