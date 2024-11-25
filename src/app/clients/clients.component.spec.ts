import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsComponent } from './clients.component';
import { ClientService } from '../services/client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ClientsComponent],
      providers: [ClientService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores vacíos', () => {
    expect(component.clientForm.value).toEqual({
      sharedKey: '',
      businessId: '',
      email: '',
      phone: '',
      dateAdded: ''
    });
  });

  it('debería obtener la lista de clientes al iniciar', () => {
    const clientsMock = [
      { sharedKey: 'ABC123', businessId: '001', email: 'test@example.com', phone: '1234567890', dateAdded: '2024-01-01' }
    ];
    spyOn(clientService, 'getClientsList').and.returnValue(of(clientsMock));

    component.getAllClients();

    expect(clientService.getClientsList).toHaveBeenCalled();
    expect(component.clients).toEqual(clientsMock);
  });

  it('debería abrir el modal cuando se hace clic en el botón "New"', () => {
    const dialogSpy = spyOn(component['dialog'], 'open').and.callThrough();

    component.openNewClientModal();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('debería buscar clientes por sharedKey', () => {
    const clientMock = [{ sharedKey: 'XYZ123', businessId: '003', email: 'search@example.com', phone: '1122334455', dateAdded: '2024-03-01' }];
    component.sharedKey = 'XYZ123';
    spyOn(clientService, 'getClientBySharedKey').and.returnValue(of(clientMock));

    component.onSearch();

    expect(clientService.getClientBySharedKey).toHaveBeenCalledWith('XYZ123');
    expect(component.clients).toEqual(clientMock);
  });

  it('debería configurar los clientes en un array vacío si no se encuentran clientes en la búsqueda', () => {
    component.sharedKey = 'XYZ123';
    spyOn(clientService, 'getClientBySharedKey').and.returnValue(of([]));

    component.onSearch();

    expect(clientService.getClientBySharedKey).toHaveBeenCalledWith('XYZ123');
    expect(component.clients).toEqual([]);
  });
});
