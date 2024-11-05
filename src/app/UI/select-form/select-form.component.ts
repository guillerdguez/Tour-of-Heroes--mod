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
export class SelectFormComponent implements OnInit {
  formGroup: FormGroup;
  @Input() options: any[] = [];

  @Input() isTableEmpty = true;
  @Output() OptionSelect = new EventEmitter<string>();
  selectedOption: any;
  usarSelect = true;
  selectedOptions: any;

  firstOption: any[] = [];

  @ViewChild('drop') dropdown: Dropdown | undefined;
  constructor() {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl({
        disabled: this.isTableEmpty,
        value: '2',
      }),
    });
  }

  ngOnInit(): void {

      this.firstOption = [this.options[0]];  
      this.options.shift();
  
  }

  resetOption() {
    this.OptionSelect.emit(this.selectedOptions.label);

    this.selectedOptions = null;
  }
  onSelectDefaultOption() {  
    this.OptionSelect.emit(this.firstOption[0].label);
 
  }
}
