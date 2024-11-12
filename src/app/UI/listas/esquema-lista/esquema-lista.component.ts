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
import { PersonaModel } from '../../../Model/Views/Dynamic/PersonaModel';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {

  paramsTemporal: any[] = [];
  headers: any[] = [];
  elegidosTemporal: PersonaConPoderes[] = [];
  items: MenuItem[] = [];
  @Input() params: PersonaConPoderes[] = [];
  @Input() title: string = '';
  @Output() toggleFavorite!: (item: any) => void;

  @Output() TableSelected = new EventEmitter<any[]>();

  @ViewChild('menu') menu!: ContextMenu;
  
  constructor(public personaModel: PersonaModel) {}
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
      this.personaModel.personasSeleccionadas = [];
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
      this.personaModel.personasSeleccionadas.length !== 0
    ) {
      if (!this.personaModel.personasSeleccionadas.includes(item)) {
        this.personaModel.personasSeleccionadas.push(item);
      } else {
        this.personaModel.personasSeleccionadas =
          this.personaModel.personasSeleccionadas.filter(
            (selected) => selected !== item
          );
      }

      this.TableSelected.emit(this.personaModel.personasSeleccionadas);
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
  onContextMenu(event: MouseEvent, item: any) {
    this.items = item.menuItemOptions();

    event.preventDefault();
    this.menu.show(event);

    if (!this.personaModel.personasSeleccionadas.includes(item)) {
      this.personaModel.personasSeleccionadas.push(item);
    }

    this.TableSelected.emit(this.personaModel.personasSeleccionadas);
  }
}
