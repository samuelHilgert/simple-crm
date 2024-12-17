import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditHeaderComponent } from './dialog-edit-header.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('DialogEditHeaderComponent', () => {
  let component: DialogEditHeaderComponent;
  let fixture: ComponentFixture<DialogEditHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditHeaderComponent, MatDialogModule, RouterModule.forRoot([]) ],
      providers: [provideAnimationsAsync(), { provide: MatDialogRef, useValue: {} }, { provide: Firestore, useValue: {} }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
