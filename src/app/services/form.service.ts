import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormData } from '../constants/types';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      contactInfo: this.createContactInfo(),
      languages: this.fb.array([this.createLanguage()]),
      experience: this.fb.array([this.createExperience()]),
      education: this.fb.array([this.createEducation()]),
      courses: this.fb.array([this.createCourse()]),
      projects: this.fb.array([this.createProject()])
    });
  }

  createContactInfo(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      github: [''],
      linkedin: [''],
      website: [''],
      image: [null],
    });
  }

  populateForm(data: FormData): void {
    if (this.form && data.contactInfo) {  
      this.form.patchValue({
        contactInfo: {
          firstName: data.contactInfo.firstName || '',
          lastName: data.contactInfo.lastName || '',
          email: data.contactInfo.email || '',
          position: data.contactInfo.position || '',
          phone: data.contactInfo.phone || '',
          location: data.contactInfo.location || '',
          github: data.contactInfo.github || '',
          linkedin: data.contactInfo.linkedin || '',
          website: data.contactInfo.website || '',
          image: data.contactInfo.image || null,
        }
      });
  
      this.setFormArray('languages', data.languages, this.createLanguage.bind(this));
      this.setFormArray('experience', data.experience, this.createExperience.bind(this));
      this.setFormArray('education', data.education, this.createEducation.bind(this));
      this.setFormArray('courses', data.courses, this.createCourse.bind(this));
      this.setFormArray('projects', data.projects, this.createProject.bind(this));
    }
  }
  

  private setFormArray<T extends { [key: string]: any }>(
    controlName: string,
    values: T[],
    createFn: () => FormGroup
  ): void {
    const formArray = this.form.get(controlName) as FormArray;
    formArray.clear();
  
    if (values && values.length) {
      values.forEach(value => {
        const group = createFn();
        group.patchValue(value);  
        formArray.push(group);
      });
    } else {
      formArray.push(createFn());
    }
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

  getContactInfo(form: FormGroup): FormGroup {
    return form.get('contactInfo') as FormGroup;
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
