import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  standalone: true,
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore); // Firestore Instance

  constructor() {
    console.log('Firestore Instance:', this.firestore); // Überprüfe, ob Firestore richtig injiziert wurde
  }

  // Methode zum Hinzufügen eines Benutzers zu Firestore
  saveUser() {
    if (!this.user.firstName || !this.user.lastName || !this.birthDate) {
      console.log('Fehlende Benutzerdaten');
      return;
    }

    this.user.birthDate = this.birthDate.getTime(); // Umwandlung in Zeitstempel
    console.log('Aktueller Benutzer:', this.user);

    // Dokument in die Firestore-Datenbank hinzufügen
    const userCollection = collection(this.firestore, 'users');
    addDoc(userCollection, { ...this.user, birthDate: this.user.birthDate })
      .then((docRef) => {
        console.log('Benutzer erfolgreich hinzugefügt:', docRef.id);
      })
      .catch((error) => {
        console.error('Fehler beim Hinzufügen des Benutzers:', error);
      });
  }

  // Methode, um alle Benutzer aus Firestore zu laden
  getUsers() {
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'id' }).subscribe((users) => {
      console.log('Benutzerdaten:', users);
    });
  }

  // Dokumentreferenz für ein einzelnes Dokument holen
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId); // Holen einer Referenz für ein einzelnes Dokument
  }
}
