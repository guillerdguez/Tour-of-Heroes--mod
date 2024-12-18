import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { villainDAO } from '../../../DAO/villain.DAO';
import { Villain } from '../../../Model/Domain/villain';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { VillainService } from '../../../Service/villain.service';
import { VillainDetails } from '../../../Model/Domain/villain-details';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponentVillain implements OnInit {
  model: any;
  villainName: any;
  villainForm: any;
villainAge: number = 0;
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
    lastName?: string
  ): void {
    name = name.trim();
    alterEgo = alterEgo?.trim() === '' ? undefined : alterEgo?.trim();
    lastName = lastName?.trim() === '' ? undefined : lastName?.trim();
    power = power.trim();
    fechoria = fechoria.trim();

    age;

    if (!name || !age || !power || !fechoria) {
      return;
    }

    this.VillainDao.getVillains().subscribe((villains) => {
      const lastVillain = villains[villains.length - 1];
      const newId = lastVillain ? lastVillain.id + 1 : 1;

      const newVillain: VillainDetails = {
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
