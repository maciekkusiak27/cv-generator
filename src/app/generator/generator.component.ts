import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { NavigationComponent } from '../commons/navigation/navigation.component';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [FormComponent, ResultComponent, NavigationComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

}
