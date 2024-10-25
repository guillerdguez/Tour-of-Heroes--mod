import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { MenuItem } from 'primeng/api';

import { ContextMenu } from 'primeng/contextmenu';

@Component({
  selector: 'app-esquema-lista',

  templateUrl: './esquema-lista.component.html',

  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, DoCheck {
  paramsTemporal: any[] = [];

  headers: any[] = [];

  formGroup: FormGroup;

  selectedItem!: any;

  selectedOption: any;

  selectTable!: any;

  @Input() options: any[] = [];

  @Input() params: any[] = [];

  @Input() title: string = '';

  @Input() items: MenuItem[] = [];

  @Output() delete = new EventEmitter<any>();

  @Output() edit = new EventEmitter<any>();

  @Output() itemSelected = new EventEmitter<any>();

  @Output() TableSelected = new EventEmitter<any>();

  @ViewChild('menu') menu!: ContextMenu;

  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl<object | null>(null),
    });
  }

  ngOnInit() {
    this.ParamsTemporal();

    this.initializeHeaders();

    this.rellenador();
  }

  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();

      this.initializeHeaders();

      this.rellenador();
    }
  }

  private ParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }

  initializeHeaders() {
    if (this.paramsTemporal.length) {
      this.headers = [];

      const keys = Object.keys(this.paramsTemporal[0]);

      for (let i = 0; i < keys.length; i++) {
        this.headers.push({
          field: keys[i],

          header: keys[i].charAt(0).toUpperCase() + keys[i].slice(1),
        });
      }
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    if (!event || !event.button) return;
    event.preventDefault();

    this.selectedItem = item;

    this.menu.show(event);

    this.itemSelected.emit(this.selectedItem);
  }

  onSelectTable(event: MouseEvent, item: any) {
    if (!event || !event.button) return;

    if (event.button === 0) {
      if (!this.selectTable.includes(item)) {
        this.selectTable.push(item); // Agrega el elemento a selectTable si no está ya
      }

      this.TableSelected.emit(this.selectTable); // Emite todos los elementos seleccionados
    }
  }

  rellenador() {
    while (this.paramsTemporal.length % 5 !== 0) {
      this.paramsTemporal.push([]);
    }
  }
}
