import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private router: Router,private supabaseService: SupabaseService) { }
  title = 'PracticeHubWebApp';
  user: any;
  loggedIn: any;
  ngOnInit() {    
    this.supabaseService.authChanges((event, session) => {
      console.log(event, session);
      this.user = session?.user;
      this.loggedIn = (session?.user != null);
      console.log(session?.user)
      localStorage.setItem('practiceUserId', JSON.stringify(session?.user?.id));
    });
  }
  async signInWithProvider(provider: string){
    try {
       await this.supabaseService.signInWithProvider(provider);
      // Redirect to the desired page after successful login
      
    } catch (error) {
      console.error('Provider login error:', error);
    }
  }

 async logoutHandler() {
    await this.supabaseService.signOut();
    this.router.navigate(['/']);
    delete this.user;
  }
}
