import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormData } from '../../../constants/types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-details-prev',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact-details-prev.component.html',
})
export class ContactDetailsPrevComponent {
  @Input()
  formData!: FormData;
}
