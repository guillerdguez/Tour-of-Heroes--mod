import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.css'],
})
export class SelectFormComponent implements OnInit {
  formGroup: FormGroup;
  @Input() items: MenuItem[] = [];
  itemsCopy: MenuItem[] = [];
  @Input() isTableEmpty = true;
  @Output() ItemSelect = new EventEmitter<any[]>();
  selectedItem: any;
  usarSelect = true;
  selectedItems: any;

  firstItem: any[] = [];

  @ViewChild('drop') dropdown!: ContextMenu  ;
  constructor() {
    this.formGroup = new FormGroup({
      selectedItem: new FormControl({
        disabled: this.isTableEmpty,
        value: '2',
      }),
    });
  }

  ngOnInit(): void {
    this.itemsCopy = [...this.items];
    this.firstItem = [this.itemsCopy[0]];
    this.itemsCopy.shift();
  }

  resetItem() {
    this.ItemSelect.emit(this.selectedItems);

    this.selectedItems = null;
  }
  onSelectDefaultItem() {
    this.ItemSelect.emit(this.firstItem[0]);
  }
  
}
