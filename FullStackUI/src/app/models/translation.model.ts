import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export interface Translation {
    id: number,
    inputText: string,
    outputTextGoogle: string,
    outputTextGpt: string,
    sourceLanguage: string,
    targetLanguage: string,
    feedbackGoogle: string,
    feedbackGpt: string,
    feedback: string,
    googleBleu: number,
    gptbleu: number,
    referenceTranslation: string,
    dateTimeOfTranslation: Date,
    classification: string,
    googleLike: number,
    gptLike: number,
    isBackTranslationActive: boolean,
    googleBackTranslation: string,
    gptBackTranslation: string
    



}