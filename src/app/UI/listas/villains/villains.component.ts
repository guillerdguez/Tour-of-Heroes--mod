import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Villain } from '../../../Model/Domain/villano';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { VillainService } from '../../../Service/villain.service';
import { FechoriaDialogComponent } from '../../fechoria-dialog/fechoria-dialog.component';

@Component({
  selector: 'app-villains',
  template: `
    <h2 class="title">{{ title }}</h2>
    <div *ngIf="villainModel.villains.length > 0">
      <app-select-form
        [items]="items"
        (ItemSelect)="onItemSelected($event)"
        [isTableEmpty]="selectedTable.length == 0"
      ></app-select-form>

      <app-esquema-lista
        [title]="title"
        [params]="villainModel.villains"
        [items]="items"
        (itemSelected)="onItemSelected($event)"
        (TableSelected)="onTableSelected($event)"
      ></app-esquema-lista>
    </div>
    <div *ngIf="villainModel.villains.length === 0">
      <h2 class="title">Sin resultados</h2>
    </div>
  `,
  providers: [DialogService],
})
export class VillainsComponent   {
}
