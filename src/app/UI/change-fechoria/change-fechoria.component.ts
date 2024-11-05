import { Component, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FechoriaDialogComponent } from '../fechoria-dialog/fechoria-dialog.component';
import { MessageService } from 'primeng/api';

@Component({
  template : ' ', 
  providers: [DialogService, MessageService],
})
export class ChangeFechoriaComponent implements OnDestroy {
  ref!: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  showDialog() {
    this.ref = this.dialogService.open(FechoriaDialogComponent, {

    });

    this.ref.onClose.subscribe((fechoria: string) => {
      if (fechoria) {
        this.messageService.add({
          severity: 'info',
          summary: 'Fechoria Selected',
          detail: fechoria,
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
