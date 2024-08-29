import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { NavigationComponent } from '../commons/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { mockData } from './mockData';
import { FormService } from '../services/form.service';
import { ContactInfo, FormData } from '../constants/types';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [FormComponent, ResultComponent, NavigationComponent, CommonModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss',
})
export class GeneratorComponent {
  formStep: number = 1;
  // formStep: number = 2;
  formData!: FormData; 
  // formData = mockData

  constructor(private formService: FormService) {} 

  onFormSubmit(formData: any) {
    this.formData = formData;
    this.formStep = 2; 
  }

  onChangeStep(step: number) {
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
  

  saveAsJSON(): void {
  //   if (this.formData && this.formData.contactInfo) {
  //     const filteredData = Object.keys(this.formData.contactInfo)
  //       .filter(key => this.formData!.contactInfo[key as keyof ContactInfo])
  //       .reduce((obj, key) => {
  //         obj[key as keyof ContactInfo] = this.formData!.contactInfo[key as keyof ContactInfo];
  //         return obj;
  //       }, {} as Partial<ContactInfo>);
  
  //     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredData));
  
  //     // Ensuring the lastName is a string or providing a fallback
  //     const lastName = this.formData.contactInfo.lastName || 'dane';
      
  //     // Ensure lastName is a string
  //     if (typeof lastName === 'string') {
  //       const downloadAnchor = document.createElement('a');
  //       downloadAnchor.setAttribute("href", dataStr);
  //       downloadAnchor.setAttribute("download", `${lastName}-cv.json`);
  //       document.body.appendChild(downloadAnchor);
  //       downloadAnchor.click();
  //       downloadAnchor.remove();
  //     } else {
  //       console.error('lastName is not a string');
  //     }
  //   }
  }
}