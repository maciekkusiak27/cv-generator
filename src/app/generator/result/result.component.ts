import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormData } from '../../constants/types';
import { ContactDetailsPrevComponent } from './contact-details-prev/contact-details-prev.component';
import { MainContentPrevComponent } from './main-content-prev/main-content-prev.component';
import { OperationButtonsComponent } from '../../commons/operation-buttons/operation-buttons.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    ContactDetailsPrevComponent,
    MainContentPrevComponent,
    OperationButtonsComponent,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() formData!: FormData;
  @Input() formStep!: number;
  @Output() changeStep = new EventEmitter<number>();
  @Output() formSaved = new EventEmitter<void>();
  @Output() generatePDF = new EventEmitter<void>();

  onSave() {
    this.formSaved.emit();
  }
}
