import { PersonaConPoderes } from "./personaConPoderes"

export interface Hero extends PersonaConPoderes {
   id: number,
     name: string,
     alterEgo?: string
     lastName?:string,
     age:number
     power: string,  [key: string]: any;

}
