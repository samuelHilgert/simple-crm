import { Component } from '@angular/core';
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
import { Firestore } from '@angular/fire/firestore';

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
    CommonModule,
  ],
  templateUrl: './dialog-edit-header.component.html',
  styleUrl: './dialog-edit-header.component.scss',
})

export class DialogEditHeaderComponent {
  loading: boolean = false;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditHeaderComponent>,
    private firestore: Firestore
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
