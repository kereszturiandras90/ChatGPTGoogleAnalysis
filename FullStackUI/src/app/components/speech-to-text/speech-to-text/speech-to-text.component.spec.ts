import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToTextComponent } from './speech-to-text.component';
import { HttpClientModule } from '@angular/common/http';

describe('SpeechToTextComponent', () => {
  let component: SpeechToTextComponent;
  let fixture: ComponentFixture<SpeechToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeechToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set isStillRecoginze to true when startService is called and service returns true', () => {
    spyOn(component.service, 'start').and.returnValue(true); // mock the start method to return true
    component.startService();
    expect(component.isStillRecoginze).toBe(true);
  });
  it('should set isStillRecoginze to false when stopService is called and service returns false', () => {
    spyOn(component.service, 'stop').and.returnValue(false); // mock the stop method to return false
    component.stopService();
    expect(component.isStillRecoginze).toBe(false);
  });
});
