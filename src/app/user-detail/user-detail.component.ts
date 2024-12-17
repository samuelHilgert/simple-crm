import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DialogEditHeaderComponent } from '../dialog-edit-header/dialog-edit-header.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardContent,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  currentUserId: any;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Holen der ID aus der URL (z.B. /user/:id)
    const userId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = userId;
    // console.log('Benutzer-ID aus der URL:', this.currentUserId);
    this.getUserDataById(); // id wird verwendet um Userdaten zu bekommen
  }

  // Methode zum Abrufen eines Benutzers mit einer bestimmten ID und Echtzeit-Updates
  getUserDataById() {
    try {
      const userDocRef = doc(this.firestore, 'users', this.currentUserId);

      // onSnapshot() für Echtzeit-Updates
      onSnapshot(userDocRef, (userDocSnapshot) => {
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();

          // Benutzerdaten werden gespeichert
          this.user = new User(userData); // statt einem array wurde oben eine user variable erneut mit dem objekt User() verknüpft, das ich schon hatte. Es ist besser projektorientiert zu arbeiten, da nun, wenn die variable aufgerufen wird, auch alle Werte vorgeschlagen werden
          console.log('Benutzerdaten (aktualisiert):', this.user);
        } else {
          console.log('Benutzer nicht gefunden!');
        }
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzerdaten:', error);
    }
  }

  openDialogEditHeader(): void {
    const dialogRef = this.dialog.open(DialogEditHeaderComponent, {});

    // Erstelle eine Kopie des Users, um ihn im Dialog zu bearbeiten
    const userCopy = new User(this.user);

    // // Konvertiere das Datum und setze es direkt auf die Kopie des Users
    // let birthDate = userCopy.birthDate;
    // if (birthDate) {
    //   let birthDateFormatted = new Date(birthDate); // Konvertiere in Date-Objekt
    //   let birthDateFormattedEnd = this.formatDate(birthDateFormatted); // Formatieren
    //   userCopy.birthDate = birthDateFormattedEnd; // Setze das formatierte Datum
    // }

    // Übergebe den User mit dem aktualisierten Datum an den Dialog
    dialogRef.componentInstance.user = userCopy;
    dialogRef.componentInstance.userId = this.currentUserId;

    dialogRef.afterClosed().subscribe((result) => {
      // Optional: Nach dem Schließen des Dialogs kannst du hier mit dem Ergebnis weiterarbeiten
    });
  }

    // Funktion um das Datum (noch Zeitstemple) zum Anzeigen in ein richtiges Datenformat umzuwandeln
    // formatDate(birthDateFormatted: any) {
    //   const month = (birthDateFormatted.getMonth() + 1)
    //     .toString()
    //     .padStart(2, '0');
    //   const day = birthDateFormatted.getDate().toString().padStart(2, '0');
    //   const year = birthDateFormatted.getFullYear();
  
    //   return `${month}/${day}/${year}`;
    // }

  openDialogEditAddress(): void {
    const dialogRef = this.dialog.open(DialogEditAddressComponent, {});
    dialogRef.componentInstance.user = new User(this.user);
    dialogRef.componentInstance.userId = this.currentUserId;
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
