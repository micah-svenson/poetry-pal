import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoetryDBService } from '../core/poetrydb.service';
import { PoemDetailComponent } from './poem-detail.component';
import { of } from 'rxjs';

class MockPoetryDBService {
  getPoemByTitle = jasmine.createSpy('getPoemByTitle').and.returnValue(of({}));
}

describe('PoemDetailViewComponent', () => {
  let component: PoemDetailComponent;
  let fixture: ComponentFixture<PoemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemDetailComponent],
      providers: [
        {
          provide: PoetryDBService,
          useClass: MockPoetryDBService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
