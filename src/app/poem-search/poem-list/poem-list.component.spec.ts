import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemListComponent } from './poem-list.component';

describe('PoemListComponent', () => {
  let component: PoemListComponent;
  let fixture: ComponentFixture<PoemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
