import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() formData = new EventEmitter<any>();
  @Output() formSaved = new EventEmitter<void>();
  @Output() changeStep = new EventEmitter<number>();

  form: FormGroup;
  

  constructor(private formService: FormService) {
    this.form = this.formService.createForm();
  }

  ngOnInit(): void {
  }

  get experience(): FormArray {
    return this.formService.getExperienceArray(this.form);
  }

  get education(): FormArray {
    return this.formService.getEducationArray(this.form);
  }

  get languages(): FormArray {
    return this.formService.getLanguagesArray(this.form);
  }

  get courses(): FormArray {
    return this.formService.getCoursesArray(this.form);
  }

  get projects(): FormArray {
    return this.formService.getProjectsArray(this.form);
  }

  saveForm() {
    this.formSaved.emit();
  }

  addExperience(): void {
    this.formService.addExperience(this.form);
  }

  addEducation(): void {
    this.formService.addEducation(this.form);
  }

  addLanguage(): void {
    this.formService.addLanguage(this.form);
  }

  addCourse(): void {
    this.formService.addCourse(this.form);
  }

  addProject(): void {
    this.formService.addProject(this.form);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formData.emit(this.form.value);
      this.changeStep.emit(2);  
    }
  }

  removeLanguage(index: number): void {
    this.removeAtIndex(this.languages, index);
  }

  removeExperience(index: number): void {
    this.removeAtIndex(this.experience, index);
  }

  removeEducation(index: number): void {
    this.removeAtIndex(this.education, index);
  }

  removeCourse(index: number): void {
    this.removeAtIndex(this.courses, index);
  }

  removeProject(index: number): void {
    this.removeAtIndex(this.projects, index);
  }

  private removeAtIndex(formArray: FormArray, index: number): void {
    if (formArray && formArray.length > index) {
      formArray.removeAt(index);
    }
  }

  onCurrentlyChange(index: number): void {
    const experienceFormGroup = this.experience.at(index) as FormGroup;
    if (experienceFormGroup) {
      const currentlyControl = experienceFormGroup.get('currently');
      const toDateControl = experienceFormGroup.get('toDate');

      if (currentlyControl && toDateControl) {
        if (currentlyControl.value) {
          toDateControl.disable();
          toDateControl.setValue('current');
        } else {
          toDateControl.enable();
          toDateControl.setValue('');
        }
      }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        image: file
      });
    }
  }
}
