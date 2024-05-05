import { AfterViewInit, Component, Input, NO_ERRORS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { Translation } from '../../../models/translation.model';
import { FormsModule } from '@angular/forms';
import { TrnslationsService } from '../../../services/trnslations.service';
import { HttpClient } from '@angular/common/http';
import { Language } from '../../../models/language.model';
import { CommonModule, NgForOf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from '@angular/material/input';
import { CustomChip } from '../../../models/customChip.model';
import { LikeDislikeComponent } from '../../like-dislike/like-dislike.component';
import { SpeechToTextModule } from '../../speech-to-text/speech-to-text/speech-to-text.module';
import { VoiceRecognitionService } from '../../../services/voice-recognition/voice-recognition.service';
import { LocalStorageService } from '../../../services/localstorageservice';
import { EventType, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';


export type Item = { code: string, language: string };

declare var webkitSpeechRecognition: any;



@Component({
  selector: 'app-add-translation',
  standalone: true,
  imports: [FormsModule, NgForOf, CommonModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatInputModule, LikeDislikeComponent, SpeechToTextModule, RouterModule],
  templateUrl: './add-translation.component.html',
  styleUrl: './add-translation.component.css',
  providers: [VoiceRecognitionService, LocalStorageService]
})
export class AddTranslationComponent implements OnInit, AfterViewInit, OnDestroy {

  itemList: any[] = [];


  @Input() categories: CustomChip[] = [{name: 'general', selected: false },{name: 'scientific', selected: false}, {name: 'literature', selected: false}, {name: 'comics', selected: false}, {name: 'slang', selected: false}];
  newCategory: CustomChip = {name: '', selected: false};

  items = [
    { name: 'Item 1', value: 'value1' },
    { name: 'Item 2', value: 'value2' },
    { name: 'Item 3', value: 'value3' },
  ];



 recentlyUsedLanguages: Language[] = [{
  "language": "English",
  "code": "en"
},
{
  "language": "German",
  "code": "de"
},
{
  "language": "Spanish",
  "code": "es"
},
{
  "language": "Chinese",
  "code": "cn"
},
{
  "language": "Italian",
  "code": "it"
}];

  panelOpenState: boolean = false;
  languages : Language[] = [];
  isActive: boolean = false;
  automaticDetection: boolean = false;
  voiceDetection: boolean = false;
  voiceInputText: string = '';
  parentLikeValueGoogle: number = 0;
  parentLikeValueGpt: number = 0;

addTranslationRequest: Translation = {
  id: 0,
  inputText: '',
  outputTextGoogle: '',
  outputTextGpt: '',
  sourceLanguage: '',
  targetLanguage: '',
  feedbackGoogle: '',
  feedbackGpt: '',
  feedback: '',
  referenceTranslation: '',
  googleBleu: -1,
  gptbleu: -1,
  dateTimeOfTranslation: new Date(Date.now()),
  classification: '',
  googleLike: 0,
  gptLike: 0,
  isBackTranslationActive: false,
  googleBackTranslation: '',
  gptBackTranslation: ''


};

private routerEventsSubscription: Subscription;

constructor(private translatiobService: TrnslationsService, private http: HttpClient, private voiceInputService: VoiceRecognitionService, private localStorageService: LocalStorageService, private router: Router) {
  console.log('const caled');
  console.log('const caled');
  this.localStorageService.delete();
  // Subscribe to router events
  this.routerEventsSubscription =  this.router.events.subscribe(event => {
    console.log('subsc ok');
    if (event.type == EventType.NavigationStart) {
      // Navigation started, save items to local storage
      this.saveItems();
      console.log("save ls called");
    } else if (event instanceof NavigationEnd) {
      // Navigation ended, load items from local storage
      this.loadItems();
      console.log("load ls called");
      console.log(this.itemList);
    }
  });

}

loadItems() {
  const storedItemList = this.localStorageService.loadFromLocalStorage('itemList');
  if (storedItemList) {
    this.itemList = storedItemList;
    this.addTranslationRequest = this.itemList as unknown as Translation;
    console.log(this.addTranslationRequest);
  }
}

saveItems() {
    this.localStorageService.saveToLocalStorage('itemList', [this.addTranslationRequest.sourceLanguage, this.addTranslationRequest.targetLanguage, this.addTranslationRequest.inputText, this.addTranslationRequest.referenceTranslation, this.addTranslationRequest.isBackTranslationActive]);
  }

onValueChangedGpt(value: number) {
  this.parentLikeValueGpt = value;
}

onValueChangedGoogle(value: number) {
  this.parentLikeValueGoogle = value;
}

ngOnInit(): void {
  this.http.get<[]>('./assets/languages.json').subscribe(data => {
    this.languages = data;
    console.log(this.languages);
  });
  console.log(this.languages);

  if (this.automaticDetection) {
    this.detectLanguage();
  }

  this.loadItems();
  console.log('subsc ok');
  // Subscribe to router events
  this.router.events.subscribe(event => {
    if (event.type == EventType.NavigationStart) {
      // Navigation started, save items to local storage
      this.loadItems();
      console.log("load ls called");
    } else if (event instanceof NavigationEnd) {
      // Navigation ended, load items from local storage
      this.saveItems();
      console.log("save ls called");
    }
  });

  
  


}

ngAfterViewInit(): void {
  this.loadItems();
  console.log('subsc ok');
  // Subscribe to router events
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      // Navigation started, save items to local storage
      this.loadItems();
      console.log("load ls called");
    } else if (event instanceof NavigationEnd) {
      // Navigation ended, load items from local storage
      this.saveItems();
      console.log("save ls called");
    }
  });
  
}

ngOnDestroy() {
  // Unsubscribe from router events when component is destroyed
  console.log('ondest called!');
  localStorage.clear();
  if (this.routerEventsSubscription) {
    this.routerEventsSubscription.unsubscribe();
  }
}


togglePanel() {
  if(this.isActive) {
this.panelOpenState = !this.panelOpenState;
  }
}

onSubmit() {
  if (this.panelOpenState) {
    this.addRating();
  } else {
    this.addTranslation();
  }
}


onInputChange(event: any) {
  console.log(this.automaticDetection);
 if(this.automaticDetection && this.addTranslationRequest.inputText != '') {
 this.detectLanguage();
 }
}

onVoiceDetection() {
  this.voiceDetection = !this.voiceDetection;
  if(this.voiceDetection) {
    this.voiceInputService.text = '';
       this.voiceInputService.init(this.addTranslationRequest.sourceLanguage);
       this.voiceInputService.start();
  } else if(!this.voiceDetection) {
    this.voiceInputService.stop();
   this.addTranslationRequest.inputText = this.voiceInputService.text;
    console.log(this.voiceInputText);
  }
}


addTranslation() {

  this.isActive = true;

this.translatiobService.addTranslation(this.addTranslationRequest).subscribe({
  next: (translation) => {
    console.log(this.addTranslationRequest);
    this.addTranslationRequest.outputTextGoogle = translation.outputTextGoogle;
    this.addTranslationRequest.outputTextGpt = translation.outputTextGpt;
    this.addTranslationRequest.googleBleu = translation.googleBleu;
    this.addTranslationRequest.gptbleu = translation.gptbleu;
    this.addTranslationRequest.dateTimeOfTranslation = translation.dateTimeOfTranslation;
    this.addTranslationRequest.gptBackTranslation = translation.gptBackTranslation;
    this.addTranslationRequest.googleBackTranslation = translation.googleBackTranslation;
    this.addTranslationRequest.isBackTranslationActive = translation.isBackTranslationActive;
  }
});
}

addRating() {

  this.isActive = false;
  this.panelOpenState = false;
  this.addTranslationRequest.classification = this.categories.filter(x => x.selected).map(x => x.name).join(" ");
  console.log(this.addTranslationRequest.classification);
  this.addTranslationRequest.gptLike = this.parentLikeValueGpt;
  this.addTranslationRequest.googleLike = this.parentLikeValueGoogle;
  

  this.translatiobService.addRating(this.addTranslationRequest).subscribe({
    next: (translation) => {
      this.translatiobService.addRating(translation);
    }
  })
  this.parentLikeValueGoogle = 0;
  this.parentLikeValueGpt = 0;
  this.addTranslationRequest.gptLike = 0;
  this.addTranslationRequest.googleLike = 0;
  this.addTranslationRequest.classification = '';
  this.addTranslationRequest.feedback = '';
  this.addTranslationRequest.feedbackGoogle = '';
  this.addTranslationRequest.feedbackGpt = '';
  this.categories.forEach(x => x.selected = false);
}

detectLanguage() {
  this.translatiobService.detectLanguage(this.addTranslationRequest).subscribe(
    {
      next: (translation) => {
        console.log(translation);
        this.addTranslationRequest.sourceLanguage = translation.sourceLanguage;
      }
    }
  );
}

addCategory() {
  if (this.newCategory.name.trim() !== '') {
    this.categories.push(this.newCategory);
    this.newCategory = {name: '', selected: false};
  }

}

removeCategory(index: number) {
  this.categories.splice(index, 1);
} 

toggleSelection(category: CustomChip) {
  category.selected = !category.selected;
}

icon = 'thumb_up';
icon2 = 'thumb_down'
iconClass = 'mat-icon-grey';



  toggleColor() {
    if (this.iconClass === 'mat-icon-grey') {
      this.iconClass = 'mat-icon-yellow';
    } else {
      this.iconClass = 'mat-icon-grey';
    }
  }


  onLanguageSelected(languageCode: string) {

    let language = this.languages.find(item => item.code == languageCode );
    if(language)


    if (!this.recentlyUsedLanguages.map(x => x.code).includes(languageCode)) {
      this.recentlyUsedLanguages.unshift(language);
      this.recentlyUsedLanguages = this.recentlyUsedLanguages.slice(0, 5);
    } else {
    }
  }

  getRecentlyUsedLanguages(): Language[] {
    return this.recentlyUsedLanguages;
   
  }

  swapValues() {
    const temp = this.addTranslationRequest.sourceLanguage;
    this.addTranslationRequest.sourceLanguage = this.addTranslationRequest.targetLanguage;
    this.addTranslationRequest.targetLanguage = temp;
  }

  onFormChange() {
    this.saveItems();
    console.log("save ls called");
  }
}