import { TestBed } from '@angular/core/testing';

import { TrnslationsService } from './trnslations.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Translation } from '../models/translation.model';

describe('TrnslationsService', () => {
  let service: TrnslationsService;
  let httpMock: HttpTestingController;
  const mockTranslations: Translation[] = [{
    id: 1,
    inputText: 'valami',
    outputTextGoogle: 'etwas',
    outputTextGpt: 'etwas',
    sourceLanguage: 'hu',
    targetLanguage: 'de',
    feedbackGoogle: '',
    feedbackGpt: '',
    feedback: '',
    googleBleu: 0,
    gptbleu: 0,
    referenceTranslation: '',
    dateTimeOfTranslation: new Date(Date.now()),
    classification: '',
    googleLike: 0,
    gptLike: 0,
    isBackTranslationActive: false,
    googleBackTranslation: '',
    gptBackTranslation: ''
  },
  {
    id: 2,
    inputText: 'valami',
    outputTextGoogle: 'something',
    outputTextGpt: 'something',
    sourceLanguage: 'hu',
    targetLanguage: 'en',
    feedbackGoogle: '',
    feedbackGpt: '',
    feedback: '',
    googleBleu: 0,
    gptbleu: 0,
    referenceTranslation: '',
    dateTimeOfTranslation: new Date(Date.now()),
    classification: '',
    googleLike: 0,
    gptLike: 0,
    isBackTranslationActive: false,
    googleBackTranslation: '',
    gptBackTranslation: ''
  }];

  const mockTranslation = {
    id: 3,
    inputText: 'valami',
    outputTextGoogle: 'нечто',
    outputTextGpt: 'нечто',
    sourceLanguage: 'hu',
    targetLanguage: 'ru',
    feedbackGoogle: '',
    feedbackGpt: '',
    feedback: '',
    googleBleu: 0,
    gptbleu: 0,
    referenceTranslation: '',
    dateTimeOfTranslation: new Date(Date.now()),
    classification: '',
    googleLike: 0,
    gptLike: 0,
    isBackTranslationActive: false,
    googleBackTranslation: '',
    gptBackTranslation: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule, HttpClientTestingModule], providers: [TrnslationsService]});
    service = TestBed.inject(TrnslationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests
  });

  it('should retrieve all translations via GET request', () => {

    service.getAllTranslations().subscribe(translations => {
      expect(translations).toEqual(mockTranslations);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/api/Translations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslations);
  });

  it('should add translation via POST request', () => {
   // const mockTranslation: Translation = { /* mock translation data */ };

    service.addTranslation(mockTranslation).subscribe(translation => {
      expect(translation).toEqual(mockTranslation);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/api/GoogleTranslate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTranslation);
    req.flush(mockTranslation);
  });

  it('should retrieve latest translation via GET request', () => {
 //   const mockTranslation: Translation = { /* mock translation data */ };

    service.getLatestTranslation().subscribe(translation => {
      expect(translation).toEqual(mockTranslation);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/api/GoogleTranslate`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslation);
  });

  it('should add rating via PUT request', () => {
  //  const mockTranslation: Translation = { /* mock translation data */ };

    service.addRating(mockTranslation).subscribe(translation => {
      expect(translation).toEqual(mockTranslation);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/api/GoogleTranslate`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockTranslation);
    req.flush(mockTranslation);
  });

  it('should detect language via POST request', () => {
   // const mockTranslation: Translation = { /* mock translation data */ };

    service.detectLanguage(mockTranslation).subscribe(translation => {
      expect(translation).toEqual(mockTranslation);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/api/LanguageDetection`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTranslation);
    req.flush(mockTranslation);
  });
});



