import {
  Component,
  OnInit,
  OnChanges,
  Input,
  EventEmitter,
  Output,
  viewChildren,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.css'],
})
export class SelectFormComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  @Input() options: any[] = [];
  @Input() isTableEmpty = true;
  @Output() OptionSelect = new EventEmitter<string>();
  selectedOption: any;
  usarSelect = true;
  selectedOptions: any;

  @ViewChild('drop') dropdown: Dropdown | undefined;
  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl({ disabled: this.isTableEmpty, value: '2' }),
    });
  }
  ngOnInit(): void {
    // this.formGroup.get('selectedOption')?.reset();
    // this.formGroup.get('selectedOption')?.valueChanges.subscribe((value) => {
    //   if (value?.label) {
    //     this.selectedOption = value;
    //     this.OptionSelect.emit(value.label);
    //   }
    // });
  }

  ngOnChanges(): void {
    // if (this.isTableEmpty) {
    //   this.formGroup.get('selectedOption')?.disable();
    // } else {
    //   this.formGroup.get('selectedOption')?.enable();
    // }
  }

  resetOption() {
    this.OptionSelect.emit(this.selectedOptions.label);
    // this.dropdown?.clear();
    this.selectedOptions = null;
  }
}
