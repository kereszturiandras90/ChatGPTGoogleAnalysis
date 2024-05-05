import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranslationComponent } from './add-translation.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomChip } from '../../../models/customChip.model';

describe('AddTranslationComponent', () => {
   let component : AddTranslationComponent;
  let fixture : ComponentFixture<AddTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTranslationComponent, HttpClientModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('swap language works', () => {
    component.addTranslationRequest.sourceLanguage = 'en';
    component.addTranslationRequest.targetLanguage = 'de';
    component.swapValues();
    expect(component.addTranslationRequest.sourceLanguage).toBe('de');
    expect(component.addTranslationRequest.targetLanguage).toBe('en');
  });
  it('get recent languages works', () => {
    let recentLanguages = component.getRecentlyUsedLanguages();
    expect(recentLanguages.map(x => x.code).join(' ')).toBe('en de es cn it');
  });
  it('onLanguageSelected works', () => {
    
   // let recentLanguages = component.getRecentlyUsedLanguages();
    component.onLanguageSelected('bg');
    expect(component.getRecentlyUsedLanguages().map(x => x.code).join(' ')).toBe('bg de es cn it');
  });
  it('toggleColor works', () => {
      component.iconClass = 'mat-icon-grey';
      component.toggleColor();
      expect(component.iconClass).toBe('mat-icon-yellow');
      component.toggleColor();
      expect(component.iconClass).toBe('mat-icon-grey');
  });
  it('toggle selection works', () => {
    let category: CustomChip;
    category = {name: '', selected: false};
    component.toggleSelection(category);
    expect(category.selected).toBeTrue();
  });
   it('add & remove category works', () => {
    component.categories = [{name: 'first', selected: false}, {name: 'second', selected: true}];
   // let category: CustomChip;
   component.newCategory = {name: 'third', selected: false};
   component.addCategory();
   expect(component.categories).toContain({name: 'third', selected: false});
   });
   it('OnInputChange works', () => {
    component.automaticDetection = true;
    component.addTranslationRequest.inputText = 'some text';
    spyOn(component, 'detectLanguage');

    component.onInputChange({ target: { value: 'New Value' } });

    expect(component.detectLanguage).toHaveBeenCalled();
   });
   it('should call addRating when panel is open', () => {
    spyOn(component, 'addRating');
    component.panelOpenState = true;
    component.onSubmit();
    expect(component.addRating).toHaveBeenCalled();
  });

  it('should call addTranslation when panel is closed', () => {
    spyOn(component, 'addTranslation');
    component.panelOpenState = false;
    component.onSubmit();
    expect(component.addTranslation).toHaveBeenCalled();
  });
  it('should set parentLikeValueGpt correctly', () => {
    const value = 10; 
    component.onValueChangedGpt(value);
    expect(component.parentLikeValueGpt).toEqual(value);
  });

  it('should set parentLikeValueGoogle correctly', () => {
    const value = 20; 
    component.onValueChangedGoogle(value);
    expect(component.parentLikeValueGoogle).toEqual(value);
  });
});

