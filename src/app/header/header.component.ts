import { Component } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private authService: SocialAuthService, private router: Router,private supabaseService: SupabaseService) { }
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
  async signInWithProvider(provider: string): Promise<void> {
    try {
      await this.supabaseService.signInWithProvider(provider);
      // Redirect to the desired page after successful login
    } catch (error) {
      console.error('Provider login error:', error);
    }
  }

  logoutHandler() {
    this.router.navigate(['/']);
    delete this.user;
  }
}
