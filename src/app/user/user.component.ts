import { Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-user',
  imports: [
    MatFabButton,
    MatIcon,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
})

export class UserComponent {
  user = new User();

    // readonly animal = signal('');
    // readonly name = model('');
    readonly dialog = inject(MatDialog);
  
    openDialog(): void {
      console.log('The dialog is open');
      const dialogRef = this.dialog.open(DialogAddUserComponent, {
        // data: {name: this.name(), animal: this.animal()},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // if (result !== undefined) {
        //   this.animal.set(result);
        // }
      });
    }
  }
  