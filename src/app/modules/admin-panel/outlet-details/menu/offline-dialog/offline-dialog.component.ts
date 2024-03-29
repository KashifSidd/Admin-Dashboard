import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment'
import { dateAndTimeValidator } from 'src/app/shared/functions/common-validation.functions';

@Component({
  selector: 'app-offline-dialog',
  templateUrl: './offline-dialog.component.html',
  styleUrls: ['./offline-dialog.component.scss'],
})
export class OfflineDialogComponent implements OnInit {
  offlineForm = new FormGroup({
    slotSelection: new FormControl('', [Validators.required]),
    date: new FormControl({ disabled: true, value: '' }, [Validators.required]),
    time: new FormControl({ disabled: true, value: '' }, [Validators.required]),
  }, { validators: [dateAndTimeValidator('date', 'time')] })
  showCustomDateTimeFields: boolean;
  currentDate = new Date();
  currentTime = moment(new Date()).format('h:mm a');

  constructor(public dialogRef: MatDialogRef<OfflineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; }

  ngOnInit(): void {
  }

  slotSelectionChange() {
    if (this.offlineForm.get('slotSelection').value) {
      this.showCustomDateTimeFields = true;
      this.offlineForm.get('date').enable();
      this.offlineForm.get('time').enable();
    } else {
      this.showCustomDateTimeFields = false;
      this.offlineForm.get('date').disable();
      this.offlineForm.get('time').disable();
    }
  }

  /**
   * Method that sends endDate in epoch format
   * @returns 
   */
  onConfirm() {
    if (this.offlineForm.status === 'INVALID') {
      this.offlineForm.markAllAsTouched();
      return;
    }
    let endDate;
    if (this.offlineForm.get('slotSelection').value) {
      const date = moment(this.offlineForm.get('date').value).format('YYYY-MM-DD');
      const time = moment(this.offlineForm.get('time').value, 'h:mm A').format('HH:mm:ss');
      endDate = new Date(date + ' ' + time);
    } else {
      // setting next day at 12:01 AM as endDate.
      endDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1)).setHours(0,1,0,0);
    }
    this.dialogRef.close({ flag: true, endDate: moment(endDate).unix() })
  }

  /**
   * Method that close the dialog
   */
  onDismiss() {
    this.dialogRef.close({ flag: false })
  }
}
