import { Component, EventEmitter, Input, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import { FormData } from '../../constants/types';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-operation-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operation-buttons.component.html',
})
export class OperationButtonsComponent {
  @Input() formData!: FormData;
  @Input() formStep!: number;
  @Output() changeStep = new EventEmitter<number>();
  @Output() formSaved = new EventEmitter<void>();
  @Output() formDataChange = new EventEmitter<FormData>();

  public editForm(): void {
    this.formDataChange.emit(this.formData);
    this.changeStep.emit(1);
  }

  public generatePDF(): void {
    const pdf = new jsPDF();
    const element = document.getElementById('pdf-content');

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(
          `${
            this.formData.contactInfo.lastName
          }-document-${new Date().toISOString()}.pdf`
        );
      });
    }
  }
}
