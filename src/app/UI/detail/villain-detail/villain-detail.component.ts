import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VillainService } from '../../../Service/villain.service';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';
@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css'],
})
export class VillainDetailComponent implements OnInit, OnChanges {
  selectedPower: string | undefined;
selectedFechoria: any;
  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location,
    public villainModel: VillainModel,
    public powerModel: PowerModel,
    public fechoriaModel: FechoriaModel
  ) {}
  ngOnChanges( ): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id);
    this.selectedPower = this.villainModel.villain?.power;
    this.selectedFechoria = this.villainModel.villain?.fechoria;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id);
   
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.villainModel.villain) {      
      this.villainService.updateVillain(this.villainModel.villain);
      this.goBack();
    }
  }
}
