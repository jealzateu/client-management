import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NewClientModalComponent } from './new-client-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NewClientModalComponent', () => {
  let component: NewClientModalComponent;
  let fixture: ComponentFixture<NewClientModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<NewClientModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [NewClientModalComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        DatePipe,
        { provide: MatDialogRef, useValue: dialogRefSpyObj }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NewClientModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<NewClientModalComponent>>;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores vacíos y validadores', () => {
    const clientForm = component.clientForm;

    expect(clientForm).toBeDefined();
    expect(clientForm.controls['sharedKey'].value).toBe('');
    expect(clientForm.controls['businessId'].value).toBe('');
    expect(clientForm.controls['email'].value).toBe('');
    expect(clientForm.controls['phone'].value).toBe('');
    expect(clientForm.controls['dateAdded'].value).toBe('');
    expect(clientForm.controls['sharedKey'].valid).toBeFalsy();
    expect(clientForm.controls['email'].valid).toBeFalsy();
  });

  it('debería marcar el formulario como inválido si hay campos vacíos o incorrectos', () => {
    component.clientForm.patchValue({
      sharedKey: '',
      businessId: '',
      email: 'invalid-email',
      phone: '12345',
      dateAdded: ''
    });

    expect(component.clientForm.valid).toBeFalsy();
  });

  it('debería marcar el formulario como válido si todos los campos son correctos', () => {
    component.clientForm.patchValue({
      sharedKey: 'testKey',
      businessId: '123',
      email: 'test@example.com',
      phone: '1234567890',
      dateAdded: '15/06/2023'
    });

    expect(component.clientForm.valid).toBeTruthy();
  });

  it('debería cerrar el diálogo con los datos del formulario formateados al llamar a `createClient`', () => {
    component.clientForm.patchValue({
      sharedKey: 'testKey',
      businessId: '123',
      email: 'test@example.com',
      phone: '1234567890',
      dateAdded: new Date('2023-06-15')
    });

    component.createClient();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith({
      sharedKey: 'testKey',
      businessId: '123',
      email: 'test@example.com',
      phone: '1234567890',
      dateAdded: new Date('2023-06-15')
    });
  });

  it('no debería cerrar el diálogo si el formulario es inválido al llamar a `createClient`', () => {
    component.clientForm.patchValue({
      sharedKey: '',
      businessId: '',
      email: 'invalid-email',
      phone: '12345',
      dateAdded: ''
    });

    component.createClient();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
