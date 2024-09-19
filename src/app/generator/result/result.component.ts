import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FormData } from '../../constants/types';
import { ContactDetailsPrevComponent } from './contact-details-prev/contact-details-prev.component';
import { MainContentPrevComponent } from './main-content-prev/main-content-prev.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    ContactDetailsPrevComponent,
    MainContentPrevComponent,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() formData!: FormData;
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
