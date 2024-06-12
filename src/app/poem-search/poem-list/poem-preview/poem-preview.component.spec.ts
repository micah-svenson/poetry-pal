import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PoemPreviewComponent } from './poem-preview.component';

describe('PoemPreviewComponent', () => {
  let component: PoemPreviewComponent;
  let fixture: ComponentFixture<PoemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemPreviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemPreviewComponent);
    component = fixture.componentInstance;
    component.poem = {
      title: 'Test title',
      author: 'Test author',
      lines: ['a', 'b', 'c'],
      linecount: '3',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
