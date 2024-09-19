import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormData } from '../../../constants/types';

@Component({
  selector: 'app-main-content-prev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content-prev.component.html',
})
export class MainContentPrevComponent {
  @Input() formData!: FormData;

}
