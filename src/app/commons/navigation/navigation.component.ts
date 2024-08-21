import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  constructor(private router: Router) {}

  navigateBack() {
    this.router.navigate(['/']); 
  }
}
