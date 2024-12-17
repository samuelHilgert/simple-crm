import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, MatDialogModule, RouterModule.forRoot([])],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: Firestore, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // // Beispiel für einen Test, der den Dialog öffnet
  // it('should open MatDialog', () => {
  //   const spy = spyOn(dialog, 'open'); // Spy auf die open-Methode von MatDialog
  //   component.openDialogEditHeader(); // Methode zum Öffnen des Dialogs aufrufen

  //   expect(spy).toHaveBeenCalled(); // Überprüfen, ob der Dialog geöffnet wurde
  // });
});
