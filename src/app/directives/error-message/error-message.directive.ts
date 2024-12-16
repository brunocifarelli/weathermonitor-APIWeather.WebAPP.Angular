import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-message-modal',
  templateUrl: './error-message.directive.html',
  styleUrls: ['./error-message.directive.css'],
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule]
})
export class ErrorMessageDirectiveComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorMessageDirectiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
