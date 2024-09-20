import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form.service';
import { FormData } from '../../constants/types';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../commons/error-dialog/error-dialog.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() formData = new EventEmitter<FormData>();
  @Output() formSaved = new EventEmitter<void>();
  @Output() changeStep = new EventEmitter<number>();

  form!: FormGroup;

  constructor(
    private formService: FormService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

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

  ngOnInit(): void {
    this.form = this.formService.createForm();
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
    } else {
      this._showValidationErrors();
    }
  }

  private _showValidationErrors(): void {
    const errors: string[] = [];
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((subField) => {
          if (control.get(subField)?.invalid) {
            errors.push(
              this.translate.instant(
                control.get(subField)?.hasError('required')
                  ? 'ERROR_REQUIRED'
                  : 'ERROR_INVALID',
                { field: subField }
              )
            );
          }
        });
      } else if (control?.invalid) {
        errors.push(
          this.translate.instant(
            control.hasError('required') ? 'ERROR_REQUIRED' : 'ERROR_INVALID',
            { field }
          )
        );
      }
    });

    this.dialog.open(ErrorDialogComponent, {
      data: { errors },
    });
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({
        image: file,
      });
    }
  }
}
