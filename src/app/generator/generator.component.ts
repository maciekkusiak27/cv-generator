import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { NavigationComponent } from '../commons/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormService } from '../services/form.service';
import { FormData } from '../constants/types';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [FormComponent, ResultComponent, NavigationComponent, CommonModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss',
})
export class GeneratorComponent {
  formStep: number = 1;
  formData!: FormData;

  constructor(private formService: FormService) {}

  public onFormSubmit(formData: FormData) {
    this.formData = formData;
    this.formStep = 2;
  }

  public onChangeStep(step: number) {
    this.formStep = step;
  }

  onFileUpload(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (typeof result === 'string') {
            const data = JSON.parse(result);
            this.formData = data;
            this.formService.populateForm(this.formData);
            this.formStep = 1;
          } else {
            throw new Error('File content is not a valid string');
          }
        } catch (error) {
          console.error('Invalid JSON file:', error);
          alert('Niepoprawny plik JSON. Proszę spróbować ponownie.');
        }
      };
      reader.readAsText(file);
    }
  }

  public saveAsJSON() {
    if (!this.formData) {
      console.error('Form data is not available');
      alert('Nie można zapisać, ponieważ dane formularza są puste.');
      return;
    }

    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.formData));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${this.formData.contactInfo?.lastName || 'formularz'}-dane-cv.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
