import { Component, OnInit, DoCheck, OnChanges, SimpleChanges, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Hero } from '../../../Model/Domain/hero';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, DoCheck, OnChanges {
  usarSelect: boolean = true;
  paramsTemporal: any[] = [];
  headers: any[] = [];
  formGroup: FormGroup;
  selectedItem: any[] = [];
  selectedOption: any;
  selectTable: Hero[] = [];
  paramsTemporalPrueba!: any[];

  @Input() options: MenuItem[] = [];
  @Input() params: any[] = [];
  @Input() title: string = '';
  @Input() items: MenuItem[] = [];  
  @Input() toggleFavorite!: (item: any) => void;

  @Output() itemSelected = new EventEmitter<any[]>();
  @Output() OptionSelect = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<Hero[]>();

  @ViewChild('menu') menu!: ContextMenu;

  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl({ disabled: this.usarSelect }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params'] && changes['params'].currentValue) {
      this.ParamsTemporal();
      this.initializeHeaders();
      this.rellenador();
    }
  }

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    this.rellenador();
  }

  ngDoCheck() { 
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();
      this.rellenador();
    }
  }

 
  onSelectTable(event: MouseEvent, item: any) {
    if (
      (event.button !== 2 && event.button !== 1) ||
      this.selectTable.length !== 0
    ) {
      if (!this.selectTable.includes(item)) {
        this.selectTable.push(item);
      } else {
        this.selectTable = this.selectTable.filter(
          (selected) => selected !== item
        );
      }

      this.TableSelected.emit(this.selectTable);
      this.formGroup.get('selectedOption')?.enable();
      this.usarSelect = this.selectTable.length === 0;
    }
  }

  ParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }

  initializeHeaders() {
    if (this.headers.length === 0 && this.paramsTemporal.length) {
      const keys = Object.keys(this.paramsTemporal[0]);
      this.headers = keys.map(key => ({
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

    if (this.selectTable.length > 0) { 
      this.itemSelected.emit(this.selectTable);
    } else {
      this.selectedItem.push(item);
      this.itemSelected.emit(this.selectedItem);
      this.selectedItem = [];
    }
  }
}
