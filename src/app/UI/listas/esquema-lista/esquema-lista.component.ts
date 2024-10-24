import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, OnChanges {
  //@Input() params: PersonaConPoderes[] = [];

  @Input() params: any[] = [];
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

  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.rellenador();
  }

  ngOnInit() {
    this.initializeHeaders();

    this.rellenador();
  }

  initializeHeaders() {
    if (this.params.length) {
      this.headers = Object.keys(this.params[0]).map((key) => ({
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
    while (this.params.length % 5 != 0) {
      this.params.push([]);
    }
  }
}
