import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      github: [''],
      linkedin: [''],
      image: [null],
      languages: this.fb.array([this.createLanguage()]),
      experience: this.fb.array([this.createExperience()]),
      education: this.fb.array([this.createEducation()]),
      courses: this.fb.array([this.createCourse()]),
      projects: this.fb.array([this.createProject()])
    });
  }

  createLanguage(): FormGroup {
    return this.fb.group({
      language: [''],
      level: ['']
    });
  }

  createExperience(): FormGroup {
    return this.fb.group({
      companyName: [''],
      position: [''],
      fromDate: [''],
      toDate: [''],
      currently: [false],
      description: ['']
    });
  }

  createEducation(): FormGroup {
    return this.fb.group({
      institution: [''],
      degree: [''],
      fieldOfStudy: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    });
  }

  createCourse(): FormGroup {
    return this.fb.group({
      course: [''],
      description: ['']
    });
  }

  createProject(): FormGroup {
    return this.fb.group({
      project: [''],
      description: [''],
      link: ['']
    });
  }

  getExperienceArray(form: FormGroup): FormArray {
    return form.get('experience') as FormArray;
  }

  getEducationArray(form: FormGroup): FormArray {
    return form.get('education') as FormArray;
  }

  getLanguagesArray(form: FormGroup): FormArray {
    return form.get('languages') as FormArray;
  }

  getCoursesArray(form: FormGroup): FormArray {
    return form.get('courses') as FormArray;
  }

  getProjectsArray(form: FormGroup): FormArray {
    return form.get('projects') as FormArray;
  }

  addExperience(form: FormGroup): void {
    this.getExperienceArray(form).push(this.createExperience());
  }

  addEducation(form: FormGroup): void {
    this.getEducationArray(form).push(this.createEducation());
  }

  addLanguage(form: FormGroup): void {
    this.getLanguagesArray(form).push(this.createLanguage());
  }

  addCourse(form: FormGroup): void {
    this.getCoursesArray(form).push(this.createCourse());
  }

  addProject(form: FormGroup): void {
    this.getProjectsArray(form).push(this.createProject());
  }
}
