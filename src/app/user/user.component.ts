import { Component, OnInit, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    MatFabButton,
    MatIcon,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
})
export class UserComponent implements OnInit {
  user = new User();
  userList: any[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit(): void {
    this.getUserDataList();
  }

  openDialog(): void {
    // console.log('The dialog is open');
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      // data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }

  // Methode, um alle Benutzer aus Firestore zu laden
  async getUserDataList() {
    try {
      const userCollection = collection(this.firestore, 'users'); // Sammle die 'users' Collection
      const querySnapshot = await getDocs(userCollection); // Hole alle Dokumente aus der Sammlung

      // Hiermit lassen sich die Darten aus der Datenbank hinzufügen
      // this.userList = querySnapshot.docs.map((doc) => {
      //   // ohne querySnapshot erhält man eine Reihe an Infos aus der firebase. mit querySnapshot kann man bestimmte Elemente herauslesen und direkt in ein array überführen, in diesem Fall .docs (also alle dokumente)
      //   // nachdem die dokumente mit samt allen infos in einem array liegen, will man nur bestimmte infos der dokumente anzeigen lassen. Das geschieht mit map
      //   return { id: doc.id, ...doc.data() }; // Mapping der Daten jedes Dokuments in die userList
      // });
      // console.log('Benutzerliste:', this.userList);

      // Wenn aber auch aktuelle Daten die neu hinzukommen, auch noch angezeigt werden sollen dann onSnapshot verwenden
      // onSnapshot ist ein Echtzeit-Listener für Echtzeit-Updates und funktioniert auch nach dem einmaligen Aufrufen der Funktion in der ngOnit
      onSnapshot(userCollection, (querySnapshot) => {
        this.userList = querySnapshot.docs.map((doc) => {
          return { userId: doc.id, ...doc.data() }; // Mapping der Daten jedes Dokuments in die userList
        });
        console.log('Benutzerliste:', this.userList); // Diese Ausgabe wird bei jeder Änderung der Daten getriggert
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzerdaten:', error);
    }
  }
}
