import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-prev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-prev.component.html',
  styleUrl: './result-prev.component.scss'
})
export class ResultPrevComponent {
  @Input() contactInfo: any; 
  @Input() experience: any;
  @Input() education: any;
  @Input() courses: any
  @Input() projects: any;
  @Input() languages: any;
}
