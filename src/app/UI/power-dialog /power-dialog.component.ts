import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PowerModel } from '../../Model/Views/Dynamic/powerModel';

@Component({
  templateUrl: './power-dialog.component.html',
  styleUrls: ['./power-dialog.component.css'],
})
export class PowerDialogComponent implements OnInit {
  powers: string[] = [];

  constructor(public ref: DynamicDialogRef, private powerModel: PowerModel) {}

  ngOnInit(): void {
    this.powers = this.powerModel.powers;
  }

  selectPower(power: string) {
    this.ref.close(power);
  }
}
