import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage!: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) { 
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        this.switchLanguage(savedLanguage);
      } else {
        this.switchLanguage('pl'); 
      }
    } else {
      this.switchLanguage('pl'); 
    }
  }

  switchLanguage(language: string) {
    this.currentLanguage = language; 
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('language', language); 
    }
    this.translateService.use(language); 
  }
}