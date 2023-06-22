import { Component } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private authService: SocialAuthService, private router: Router) { }
  title = 'PracticeHubWebApp';
  user: any;
  loggedIn: any;
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
      this.router.navigate(['/subject'])
    });
  }
  logoutHandler() {
    this.router.navigate(['/']);
    delete this.user;
  }
}
