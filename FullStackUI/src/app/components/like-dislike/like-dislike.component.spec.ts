import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDislikeComponent } from './like-dislike.component';

describe('LikeDislikeComponent', () => {
  let component: LikeDislikeComponent;
  let fixture: ComponentFixture<LikeDislikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeDislikeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikeDislikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toggle like button when active works as expected', () => {
    component.likeActive = true;
    component.toggleLike();
    expect(component.likeActive).toBeFalse();
    expect(component.likeState).toBe(0);
  });
  it('toggle dislike button when active works as expected', () => {
    component.likeActive = true;
    component.toggleDislike();
    expect(component.likeActive).toBeFalse();
    expect(component.dislikeActive).toBeTrue();
    expect(component.likeState).toBe(-1);
  });
  it('toggle dislike button when active works as expected', () => {
    component.dislikeActive = true;
    component.toggleDislike();
    expect(component.dislikeActive).toBeFalse();
    expect(component.likeState).toBe(0);
  });
});
