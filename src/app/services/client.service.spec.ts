import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });

    service = TestBed.inject(ClientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de clientes', () => {
    const mockClients = [
      { sharedKey: 'key1', businessId: '123', email: 'test1@example.com', phone: '1234567890', dateAdded: '2023-01-01' },
      { sharedKey: 'key2', businessId: '456', email: 'test2@example.com', phone: '0987654321', dateAdded: '2023-01-02' }
    ];

    service.getClientsList().subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/client/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('debería buscar un cliente por sharedKey', () => {
    const mockClient = [
      { sharedKey: 'key1', businessId: '123', email: 'test1@example.com', phone: '1234567890', dateAdded: '2023-01-01' }
    ];
    const sharedKey = 'key1';

    service.getClientBySharedKey(sharedKey).subscribe(client => {
      expect(client).toEqual(mockClient);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/client/searchBySharedKey?sharedKey=${sharedKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('debería crear un cliente', () => {
    const newClient = { sharedKey: 'key3', businessId: '789', email: 'test3@example.com', phone: '1112223333', dateAdded: '2023-01-03' };

    service.createClient(newClient).subscribe(client => {
      expect(client).toEqual(newClient);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/client');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(newClient);
  });
});
