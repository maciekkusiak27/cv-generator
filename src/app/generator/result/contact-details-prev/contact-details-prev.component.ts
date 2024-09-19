import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormData } from '../../../constants/types';

@Component({
  selector: 'app-contact-details-prev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-details-prev.component.html',
})
export class ContactDetailsPrevComponent {
  @Input()
  formData!: FormData;

}
