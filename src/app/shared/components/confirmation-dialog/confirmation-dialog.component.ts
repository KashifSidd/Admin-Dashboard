import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  message: string;
  confirmBtnText: string;
  dismissBtnText: string;
  icon: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputRequired: boolean;
  cancellationReason: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
    this.confirmBtnText = data.confirmBtnText;
    this.dismissBtnText = data.dismissBtnText;
    this.icon = data.icon;
    this.inputLabel = data.inputLabel;
    this.inputPlaceholder = data.inputPlaceholder;
    this.inputRequired = data.inputRequired;
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  /**
 * Method that Handles the cancellation action by closing the dialog with confirmation and cancellation reason (if required).
 * If cancellation reason is required and not provided, the method does nothing.
 */
  onConfirmWithReason() {
    if (this.inputRequired && this.cancellationReason.invalid) {
      return;
    }
    this.dialogRef.close({ confirmed: true, cancellationReason: this.cancellationReason.value });
  }
}