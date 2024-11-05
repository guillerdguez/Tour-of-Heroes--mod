import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FechoriaModel } from '../../Model/Views/Dynamic/fechoriaModel';

@Component({
  templateUrl: './fechoria-dialog.component.html',
  styleUrls: ['./fechoria-dialog.component.css'],
})
export class FechoriaDialogComponent implements OnInit {
  fechorias: string[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private fechoriaModel: FechoriaModel
  ) {}

  ngOnInit(): void {
    this.fechorias = this.fechoriaModel.fechorias.map((f) => f.name);
  }

  selectFechoria(fechoria: string) {
    this.ref.close(fechoria);
  }
}
