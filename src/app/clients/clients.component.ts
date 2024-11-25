import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewClientModalComponent } from './new-client-modal/new-client-modal.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientForm: FormGroup;
  isEditing: boolean = false;
  editingIndex: number | null = null;
  sharedKey: string = '';

  clients: any[] = [];
  displayedColumns: string[] = ['sharedKey', 'businessId', 'email', 'phone', 'dateAdded', 'actions'];

  constructor(private readonly fb: FormBuilder, private readonly dialog: MatDialog, private readonly clientService: ClientService) {
    this.clientForm = this.fb.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateAdded: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClientsList().subscribe((clients: any[]) => {
      this.clients = clients;
    });
  }

  openNewClientModal() {
    const dialogRef = this.dialog.open(NewClientModalComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.createClient(result).subscribe((client: any) => {
          this.getAllClients();
        });
      }
    });
  }

  onEdit(index: number) {
    console.log(index);
  }

  onSearch() {
    this.clientService.getClientBySharedKey(this.sharedKey).subscribe((client: any) => {
      if (client.length) {
        this.clients = client;
      } else {
        this.clients = [];
      }
    });
  }
}
