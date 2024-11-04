import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Hero } from '../../Model/Domain/hero';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.css'],  
})
export class SelectFormComponent implements OnInit, OnChanges {
  usarSelect: boolean = true;
  
  formGroup: FormGroup;
  
  selectedOption: any;
  @Input() selectTable: Hero[] = [];
  @Input() options: any[] = [];
  
  @Output() OptionSelect = new EventEmitter<string>();
 
  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl({ disabled: this.usarSelect }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectTable'] && changes['selectTable'].currentValue) {
      if (this.selectTable && this.selectTable.length > 0) {
        this.formGroup.get('selectedOption')?.enable();
        this.usarSelect = false;
      } else {
        this.formGroup.get('selectedOption')?.disable();
        this.usarSelect = true;
      }
    }
  }
  ngOnInit(): void {
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
      selectedControl.reset(); // Resetear el control
      this.usarSelect = true; // Reiniciar la selección
    }
  }
  
 
}
