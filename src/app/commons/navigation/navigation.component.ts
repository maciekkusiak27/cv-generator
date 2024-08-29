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
  @Output() fileUploaded = new EventEmitter<any>();

  constructor(private router: Router) {}

  navigateBack() {
    this.router.navigate(['/']); 
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); 
    }
  }


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileUploaded.emit(file); 
    }
  }
  
}
