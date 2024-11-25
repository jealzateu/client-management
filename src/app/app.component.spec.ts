import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el app component', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el título "client-management"', () => {
    expect(component.title).toEqual('client-management');
  });

  it('debería tener elementos de menú definidos', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);
    expect(component.menuItems).toEqual([
      { name: 'Clients', route: '/clients' },
      { name: 'Client Look History', route: '/client-look-history' },
      { name: 'Emergency PIN Configuration', route: '/emergency-pin-configuration' },
      { name: 'Emergency PIN History', route: '/emergency-pin-history' },
    ]);
  });
});
