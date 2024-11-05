import { Component, Input, OnInit } from '@angular/core';
import { villainDAO } from '../../../DAO/villain.DAO';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { VillainService } from '../../../Service/villain.service';
import { Villain } from '../../../Model/Domain/villano';
import { InMemoryDataService } from '../../../Service/in-memory-data.service';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';
import { Fechoria } from '../../../Model/Domain/fechoria';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponentVillain implements OnInit {
  model: any;
  villainName: any;
  villainForm: any;
selectedFechoria: any;
  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private VillainDao: villainDAO,
    public powerModel: PowerModel,
    public fechoriaModel: FechoriaModel,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.powerModel.powers;
  }
  add(
    name: string,
    age: number,
    power: string,
    fechoria: string,
    alterEgo?: string,
    lastName?: string,
   
  ): void {
    name = name.trim();
    alterEgo = alterEgo?.trim() === '' ? undefined : alterEgo?.trim();
    lastName = lastName?.trim() === '' ? undefined : lastName?.trim();
    power = power.trim();
 
    age;

    if (!name || !age || !power || !fechoria) {
      return;
    }

    this.VillainDao.getVillains().subscribe((villains) => {
      const lastVillain = villains[villains.length - 1];
      const newId = lastVillain ? lastVillain.id + 1 : 1;
      const newVillain: Villain = {
        id: newId,
        name,
        age,
        power,
        fechoria,
        alterEgo,
        lastName,
      };

      this.villainService.addVillain(newVillain);
    
      this.goBack();
    });
  }
  goBack(): void {
    this.router.navigate(['/villains']);
  }
}
