import { Component, OnInit } from '@angular/core';
import { Translation } from '../../../models/translation.model';
import { CommonModule } from '@angular/common';
import { TrnslationsService } from '../../../services/trnslations.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-translations-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './translations-list.component.html',
  styleUrl: './translations-list.component.css'
})
export class TranslationsListComponent {

  translations: Translation[] = [];
constructor(private translationService: TrnslationsService) {}

ngOnInit(): void {
 this.translationService.getAllTranslations().subscribe({
  next: (translations) => {
    this.translations = translations;
    console.log(translations);
  },
  error: (response) => {
    console.log(response);
  }
 })
}




}
