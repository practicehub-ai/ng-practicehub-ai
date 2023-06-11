import { Component } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private authService: SocialAuthService) { }
  title = 'PracticeHubWebApp';
  user: any;
  loggedIn: any;
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
    });
  }
}
