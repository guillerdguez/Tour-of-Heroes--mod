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
  selectTable!: any;

  @Input() options: any[] = [];
  @Input() params: any[] = [];
  @Input() title: string = '';
  @Input() items: MenuItem[] = [];
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<any>();
  @Output() OptionSelecet = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any>();
  @ViewChild('menu') menu!: ContextMenu;

  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl({
        value: null,
        disabled: this.usarSelect,
      }),
    });
  }

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    this.rellenador();

    this.formGroup.get('selectedOption')?.valueChanges.subscribe((value) => {
      this.selectedOption = value; 
      this.OptionSelecet.emit(this.selectedOption?.label);
    });
  }

  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.ParamsTemporal();
 
      this.rellenador();
    }
    if (this.selectTable == null || undefined) {
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

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.selectedItem = item;
    this.menu.show(event);
    this.selectTable = null;
    this.itemSelected.emit(this.selectedItem);
  }

  onSelectTable(event: MouseEvent, item: any) {
    if (event.button !== 2 && event.button !== 1) {
      event.preventDefault();
      this.selectTable = item;
      this.TableSelected.emit(this.selectTable);
      this.formGroup.get('selectedOption')?.enable();
      this.usarSelect = false;
    }
  }

  rellenador() {
    while (this.paramsTemporal.length % 5 !== 0) {
      this.paramsTemporal.push([]);
    }
  }
}
