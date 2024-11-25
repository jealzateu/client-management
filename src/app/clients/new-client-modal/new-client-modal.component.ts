import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-client-modal',
  templateUrl: './new-client-modal.component.html',
  styleUrls: ['./new-client-modal.component.css'],
  providers: [DatePipe]
})
export class NewClientModalComponent {
  clientForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<NewClientModalComponent>,
    private readonly datePipe: DatePipe
  ) {
    this.clientForm = this.fb.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateAdded: ['', Validators.required]
    });
  }

  createClient() {
    if (this.clientForm.valid) {
      const formData = { ...this.clientForm.value };
      formData.dateAdded = this.datePipe.transform(formData.dateAdded, 'dd/MM/yyyy');
      this.dialogRef.close(this.clientForm.value);
    }
  }
}
