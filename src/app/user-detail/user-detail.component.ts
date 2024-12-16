import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardContent,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  currentUserId: any;
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

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

}
