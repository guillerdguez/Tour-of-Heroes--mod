import {
  Component,
  OnInit,
  DoCheck,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, DoCheck, OnChanges {
  paramsTemporal: any[] = [];
  headers: any[] = [];

  selectedItem: any[] = [];

  selectedTable: any[] = [];
  paramsTemporalPrueba!: any[];

  @Input() items: MenuItem[] = [];
  @Input() params: any[] = [];
  @Input() title: string = '';
  @Input() toggleFavorite!: (item: any) => void;

  @Output() itemSelected = new EventEmitter<any[]>();
  @Output() ItemSelect = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();

  @ViewChild('menu') menu!: ContextMenu;

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    this.rellenador();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params'] && changes['params'].currentValue) {
      this.ParamsTemporal();
      this.initializeHeaders();
      this.rellenador();
      this.selectedTable = [];
    }
  }

  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();
      this.rellenador();
    }
  }

  onselectedTable(event: MouseEvent, item: any) {
    if (
      (event.button !== 2 && event.button !== 1) ||
      this.selectedTable.length !== 0
    ) {
      if (!this.selectedTable.includes(item)) {
        this.selectedTable.push(item);
      } else {
        this.selectedTable = this.selectedTable.filter(
          (selected) => selected !== item
        );
      }

      this.TableSelected.emit(this.selectedTable);
    }
  }

  ParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }

  initializeHeaders() {
    if (this.headers.length === 0 && this.paramsTemporal.length) {
      const keys = Object.keys(this.paramsTemporal[0]);
      this.headers = keys.map((key) => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }));
    }
  }

  rellenador() {
    while (this.paramsTemporal.length % 5 !== 0) {
      this.paramsTemporal.push([]);
    }
  }
  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.menu.show(event);

    if (this.selectedTable.length > 0) {
      this.itemSelected.emit(this.selectedTable);
    } else {
 
      this.selectedItem.push(item);
      this.itemSelected.emit(this.selectedItem);
      this.selectedItem = [];
    }
  }
}
