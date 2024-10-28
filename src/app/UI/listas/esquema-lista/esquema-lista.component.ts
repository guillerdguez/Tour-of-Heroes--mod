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
  usarSelect: boolean = true;
  paramsTemporal: any[] = [];
  headers: any[] = [];
  formGroup: FormGroup;
  selectedItem!: any;
  selectedOption: any;
  selectTable: any[] = [];

  @Input() options: any[] = [];
  @Input() params: any[] = [];
  @Input() title: string = '';
  @Input() items: MenuItem[] = [];
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<any>();
  @Output() OptionSelect = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();
  @ViewChild('menu') menu!: ContextMenu;

  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl({
        disabled: this.usarSelect,
      }),
    });
  }

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    this.rellenador();

    this.formGroup.get('selectedOption')?.valueChanges.subscribe((value) => {
      if (value && value.label) {
        this.selectedOption = value;
        this.OptionSelect.emit(value.label);
        this.selectTable = [];
      }
    });
  }

  resetOption() {
    const selectedControl = this.formGroup.get('selectedOption');
    if (selectedControl) {
      selectedControl.reset();
    }
  }

  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();
      this.rellenador();
    }

    if (
      this.selectTable === null ||
      this.selectTable === undefined ||
      this.selectTable.length === 0
    ) {
      this.formGroup.get('selectedOption')?.disable();
      this.usarSelect = true;
    }
  }

  private ParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }

  initializeHeaders() {
    if (this.headers.length === 0 && this.paramsTemporal.length) {
      const keys = Object.keys(this.paramsTemporal[0]);

      for (let i = 0; i < keys.length; i++) {
        this.headers.push({
          field: keys[i],
          header: keys[i].charAt(0).toUpperCase() + keys[i].slice(1),
        });
      }
    }
  }
//no funciona pero si hay alguna forma de que pueda detectar cuando presiono en la opcion para que borre la selecion en la tabla
  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.menu.show(event);
    
    if (this.selectTable.length > 0) {
      // this.selectedItem = [...this.selectTable]; 
      this.itemSelected.emit(this.selectTable);
      this.formGroup.get('selectedOption')?.enable();  this.formGroup.get('selectedOption')?.enable();
      this.usarSelect = this.selectTable.length === 0;
    } else {
      this.selectedItem = item;
      this.itemSelected.emit(this.selectedItem);
    }
    
 
    // this.selectTable = []; 
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
      console.log(this.selectTable);
      this.TableSelected.emit(this.selectTable);
      this.formGroup.get('selectedOption')?.enable();
      this.usarSelect = this.selectTable.length === 0;    console.log(this.selectTable,"ddddddddddddddddd");
    }
  }

  rellenador() {
    while (this.paramsTemporal.length % 5 !== 0) {
      this.paramsTemporal.push([]);
    }
  }
}
