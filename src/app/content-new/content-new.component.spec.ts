import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNewComponent } from './content-new.component';

describe('ContentNewComponent', () => {
  let component: ContentNewComponent;
  let fixture: ComponentFixture<ContentNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentNewComponent]
    });
    fixture = TestBed.createComponent(ContentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
