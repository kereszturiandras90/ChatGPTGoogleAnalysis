import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {EventEmitter} from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-like-dislike',
  standalone: true,
  imports: [ CommonModule, MatIconModule],
  templateUrl: './like-dislike.component.html',
  styleUrl: './like-dislike.component.css'
})
export class LikeDislikeComponent {
  @Input() likeValue: number = 0; // Input property

  @Output() valueChanged = new EventEmitter<number>();


  likeActive: boolean = false;
  dislikeActive: boolean = false;
  likeState : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  toggleLike() {
    if (!this.likeActive) {
      this.likeActive = true;
      this.dislikeActive = false;
    } else {
      this.likeActive = false;
    }
    this.calculateValue();
  }

  toggleDislike() {
    if (!this.dislikeActive) {
      this.dislikeActive = true;
      this.likeActive = false;
    } else {
      this.dislikeActive = false;
    }
   this.calculateValue();
    
  }


  calculateValue() {
    if (this.likeActive && !this.dislikeActive) {
      this.likeState = 1;
    } else if (!this.likeActive && this.dislikeActive) {
      this.likeState = -1;
    } else {
      this.likeState = 0;
    }
    console.log(this.likeState);
    this.valueChanged.emit(this.likeState);
  }



}
