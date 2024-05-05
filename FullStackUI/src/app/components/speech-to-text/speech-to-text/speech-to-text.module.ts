import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechToTextComponent } from './speech-to-text.component';

@NgModule({
  declarations: [SpeechToTextComponent],
  imports: [CommonModule],
  exports: [SpeechToTextComponent] // Export the component if it needs to be used outside this module
})
export class SpeechToTextModule { }
