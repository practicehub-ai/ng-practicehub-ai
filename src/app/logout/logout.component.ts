import { Component } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent {
  constructor(private authService: SocialAuthService,private router: Router) { }
  ngOnInit() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
