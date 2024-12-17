import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-header',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-edit-header.component.html',
  styleUrl: './dialog-edit-header.component.scss',
})
export class DialogEditHeaderComponent {
  birthDate: Date = new Date();
  loading: boolean = false;
  user: any  = {};
  userId: string = '';
  birthDateFormatted: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogEditHeaderComponent>,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) {}

  // Methode zum Hinzufügen der neuen Daten des Benutzers zu Firestore
  // wird aufgerufen, wenn UserDaten nach Eingabe gespeichert werden sollen
  saveNewUserData() {
    if (this.checkUserDataMissing()) {
      this.loading = true; // loading progessbar activated
      this.saveChanges();
      console.log('Aktueller Benutzer:', this.user);
      this.loading = false; // loading progessbar deactivated
      this.closeDialog();
    }
  }

  // Eingabedaten werden überprüft
  checkUserDataMissing() {
    if (!this.user.firstName || !this.user.lastName || !this.user.birthDate) {
      console.log('Fehlende Benutzerdaten, bitte ergänzen');
      return false;
    } else {
      console.log('Benutzerdaten vollständig');
      return true;
    }
  }

  // fügt neuen Benutzer in Datenbank hinzu
  saveChanges() {
    // this.user.birthDate = this.birthDate.getTime(); // Umwandlung Datum in Zeitstempel

    // Dokumentreferenz für Firestore erstellen
    const userDocRef = doc(this.firestore, 'users', this.userId);

    // `updateDoc()` erwartet die Dokumentreferenz als erstes Argument
    updateDoc(userDocRef, { ...this.user, birthDate: this.user.birthDate })
      .then(() => {
        console.log('Benutzer erfolgreich aktualisiert:', this.userId);
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
