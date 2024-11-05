import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechoriaDialogComponent } from './fechoria-dialog.component';

describe('FechoriaDialogComponent', () => {
  let component: FechoriaDialogComponent;
  let fixture: ComponentFixture<FechoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FechoriaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FechoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
