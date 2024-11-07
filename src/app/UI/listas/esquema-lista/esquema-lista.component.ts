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
import { PersonaConPoderes } from '../../../Model/Domain/personaConPoderes';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  paramsTemporal: any[] = [];
  headers: any[] = [];

  selectedTable: any[] = [];
  elegidosTemporal: PersonaConPoderes[] = [];
  items: MenuItem[] = [];
  @Input() params: PersonaConPoderes[] = [];
  @Input() title: string = '';
  @Input() toggleFavorite!: (item: any) => void;

  // @Output() ItemSelect = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();

  @ViewChild('menu') menu!: ContextMenu;
  click!: MouseEvent;

  ngOnInit() {
    this.ParamsTemporal();
    this.initializeHeaders();
    this.rellenador();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']?.currentValue) {
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
      this.headers = this.paramsTemporal[0].getHeaders();
    }
  }

  rellenador() {
    while (this.paramsTemporal.length % 5 !== 0) {
      this.paramsTemporal.push([]);
    }
  }
  // onContextMenu(event: MouseEvent, item: any) {
  //   this.items = item.menuItem();
  //   event.preventDefault();
  //   this.menu.show(event);

  //   if (this.selectedTable.length > 0) {

  //     this.itemSelected.emit(this.selectedTable);
  //   } else {
  //     this.selectedTable.push(item);
  //     this.itemSelected.emit(this.selectedTable);
  //     this.selectedTable = [];
  //   }
  // }

  //   selecciono una persona
  // lo meto en un array que tenga definido en la clase
  // cuando se ejecute una acción en el context menú:
  // 3.1 consigo las acciones a realizar
  // 3.2 paso por todos las personas de mi array
  // 3.3 a cada una le digo que ajecute la acción seleccionada
  //   en las acciones del context menú (la parte que se ejecuta, osea el command) se ejecuta sobre cada persona, no?

  // pues tendrás que mirar una forma de hacer que puedas con esa lista decirles que ejecuten la acción seleccionada

  // por ejemplo, cuando hagas click sobre una acción, que todos los que estén en la lista sepan que cuando les digas
  // que ejecuten la acción, sepan cada uno cual tiene que hacer y que la hagan

  // al igual que cada uno tiene su propio menuItems pues también pueden tener un campo que sea la acción a realizar

  // por ejemplo vaya, asi sin acordarme mucho como está montado

  onContextMenu(event: MouseEvent, item: any) {
    this.items = item.menuItem();
    console.log(this.items[0]);
    event.preventDefault();
    this.menu.show(event);

    if (this.selectedTable.length > 0) {
      this.TableSelected.emit(this.selectedTable);
    } else {
      this.selectedTable.push(item);
      this.TableSelected.emit(this.selectedTable);
      this.selectedTable = [];
    }
  }
}
