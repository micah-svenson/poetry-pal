import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemSearchComponent } from './poem-search.component';
import { HttpClient } from '@angular/common/http';
import { PoetryDBService } from '../core/poetrydb.service';

class MockPoetryDBService {}

describe('PoemSearchComponent', () => {
  let component: PoemSearchComponent;
  let fixture: ComponentFixture<PoemSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemSearchComponent],
      providers: [
        {
          provide: PoetryDBService,
          useClass: MockPoetryDBService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
