import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @Input()
  formStep!: Number;
  @Output() fileUploaded = new EventEmitter<File>();
  @Output() stepBack = new EventEmitter<void>(); 


  constructor(private router: Router) {}

  public navigateBack() {
    if (this.formStep === 1) {
      this.router.navigate(['/']);
    } else {
      this.stepBack.emit(); 
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.fileUploaded.emit(file);
    }
  }
}
