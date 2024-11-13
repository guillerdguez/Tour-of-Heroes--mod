import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PersonaConPoderes } from '../../../Model/Domain/personaConPoderes';
import { PersonaModel } from '../../../Model/Views/Dynamic/PersonaModel';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  @Output() paramsChange = new EventEmitter<any>();
  @Output() TableSelected = new EventEmitter<any[]>();

  @Input() params: PersonaConPoderes[] = [];
  @Input() title: string = '';

  paramsTemporal: any[] = [];
  headers: any[] = [];
  items: MenuItem[] = [];

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
    if (event.button !== 2 && event.button !== 1) {
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
    this.items = item.getMenuItemOptions();
    event.preventDefault();
    this.menu.show(event);

    if (!this.personaModel.personasSeleccionadas.includes(item)) {
      this.personaModel.personasSeleccionadas.push(item);
    }

    this.TableSelected.emit(this.personaModel.personasSeleccionadas);
  }

  onValueChange(
    item: PersonaConPoderes,
    field: keyof PersonaConPoderes,
    newValue: any
  ): void {
    item[field] = newValue;
    this.params = [...this.params];
    this.paramsChange.emit(item.setDetails(item));
  }
  onKeyPress(event: KeyboardEvent, type: string): void {
    if (type === 'number') {
      const char = event.key;

      if (
        !/[0-9]/.test(char) &&
        char !== 'Backspace' &&
        char !== 'Delete' &&
        char !== 'ArrowLeft' &&
        char !== 'ArrowRight'
      ) {
        event.preventDefault();
      }
    }
  }
}
