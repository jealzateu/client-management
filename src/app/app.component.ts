import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-management';

  menuItems = [
    { name: 'Clients', route: '/clients' },
    { name: 'Client Look History', route: '/client-look-history' },
    { name: 'Emergency PIN Configuration', route: '/emergency-pin-configuration' },
    { name: 'Emergency PIN History', route: '/emergency-pin-history' },
  ];

  isSidenavOpen = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSidenavOpen = window.innerWidth > 768;
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSidenavOpen = window.innerWidth > 768;
  }
}
