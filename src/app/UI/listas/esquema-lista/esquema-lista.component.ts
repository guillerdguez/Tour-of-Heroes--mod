import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  output,
  DoCheck,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Router } from '@angular/router';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, DoCheck {
  //@Input() params: PersonaConPoderes[] = [];

  @Input() params: any[] = [];
  paramsTemporal: any[] = [];
  @Input() title: string = '';
  @Input() items: MenuItem[] = [];
  selectedItem!: any;
  @ViewChild('menu') menu!: ContextMenu;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() item: any[] = this.selectedItem;
  headers: any[] = [];
  emptyRows: number = 0;
  @Output() itemSelected = new EventEmitter<any>();

  constructor(private heroModel: HeroModel) {}
  ngOnInit() {
    this.updateParamsTemporal();
    this.initializeHeaders();
    this.rellenador();
  }
  ngDoCheck() {
    if (this.params !== this.paramsTemporal) {
      this.updateParamsTemporal();
      this.initializeHeaders();
      this.rellenador();
    }
  }
  private updateParamsTemporal() {
    this.paramsTemporal = [...this.params];
  }
  initializeHeaders() {
    if (this.paramsTemporal.length) {
      this.headers = Object.keys(this.paramsTemporal[0]).map((key) => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }));
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.selectedItem = item;
    this.menu.show(event);
    this.itemSelected.emit(this.selectedItem);
  }

  rellenador() {
    while (this.paramsTemporal.length % 5 != 0) {
      this.paramsTemporal.push([]);
    }
  }
}
