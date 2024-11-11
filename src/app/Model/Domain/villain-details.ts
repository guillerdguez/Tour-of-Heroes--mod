import { personaDetails } from './persona-details';

export interface VillainDetails extends personaDetails {
  fechoria: string | undefined;
}
