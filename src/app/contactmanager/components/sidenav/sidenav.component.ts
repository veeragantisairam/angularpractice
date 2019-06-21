import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;

  constructor(zone: NgZone,
    private router: Router,
    private userservice: UserService) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  ngOnInit() {
    this.users = this.userservice.users;
    this.userservice.loadAll();

    // this.users.subscribe(data=>{
    //   if(data.length>0) this.router.navigate(['/contactmanager',data[0].id]);
    //   console.log(data);
    // })


    this.router.events.subscribe(() => {
      if (this.isScreenSmall())   
        this.sidenav.close();
    })
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
