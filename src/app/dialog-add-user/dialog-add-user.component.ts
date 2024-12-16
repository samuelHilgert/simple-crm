import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { doc, getDoc } from 'firebase/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  standalone: true,
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore); // injiziert Firebase aus app.config
  userList: any[] = [];
  loading: boolean = false;

  constructor(public dialogRef : MatDialogRef<DialogAddUserComponent>) {
    this.getUserDataList();
  }

  ngOnInit() {
    // noch kein Code vorhanden
  }

  // Methode zum Hinzufügen eines Benutzers zu Firestore
  // wird aufgerufen, wenn UserDaten nach Eingabe gespeichert werden sollen
  saveUser() {
    if (this.checkUserDataMissing()) {
      this.loading = true; // loading progessbar activated
      this.addUser();
      console.log('Aktueller Benutzer:', this.user);
      this.loading = false; // loading progessbar deactivated
      this.closeDialog();
    }
  }

  // Eingabedaten werden überprüft
  checkUserDataMissing() {
    if (
      !this.user.firstName ||
      !this.user.lastName ||
      !this.birthDate ||
      !this.user.street ||
      !this.user.houseNumber ||
      !this.user.zipCode ||
      !this.user.city
    ) {
      console.log('Fehlende Benutzerdaten, bitte ergänzen');
      return false;
    } else {
      console.log('Benutzerdaten vollständig');
      return true;
    }
  }

  // fügt neuen Benutzer in Datenbank hinzu
  addUser() {
    this.user.birthDate = this.birthDate.getTime(); // Umwandlung Datum in Zeitstempel
    const userCollection = collection(this.firestore, 'users');
    addDoc(userCollection, { ...this.user, birthDate: this.user.birthDate }) // der spread operator ... übernimmt die daten so aus dem objekt user, ohne diesen würde das ganze objekt als einzelnes feld gespeichert werden
      .then((docRef) => {
        console.log('Benutzer erfolgreich hinzugefügt:', docRef.id);
      })
      .catch((error) => {
        console.error('Fehler beim Hinzufügen des Benutzers:', error);
      });
  }

  // Methode, um alle Benutzer aus Firestore zu laden
  async getUserDataList() {
    try {
      const userCollection = collection(this.firestore, 'users'); // Sammle die 'users' Collection
      const querySnapshot = await getDocs(userCollection); // Hole alle Dokumente aus der Sammlung

      this.userList = querySnapshot.docs.map((doc) => {
        // ohne querySnapshot erhält man eine Reihe an Infos aus der firebase. mit querySnapshot kann man bestimmte Elemente herauslesen und direkt in ein array überführen, in diesem Fall .docs (also alle dokumente)
        // nachdem die dokumente mit samt allen infos in einem array liegen, will man nur bestimmte infos der dokumente anzeigen lassen. Das geschieht mit map
        return { id: doc.id, ...doc.data() }; // Mapping der Daten jedes Dokuments in die userList
      });
      console.log('Benutzerliste:', this.userList);
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzerdaten:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
