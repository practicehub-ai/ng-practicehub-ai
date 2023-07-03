import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,private supabaseService: SupabaseService){}
  user: any;
  loggedIn: any;
  ngOnInit() {    
    this.supabaseService.authChanges((event, session) => {     
      //console.log(event, session);
      this.user = session?.user;
      this.loggedIn = (session?.user != null);
      
      if(this.loggedIn) {this.router.navigate(['/subject']);}
      else {this.router.navigate(['/login']);}

      console.log("session user Id ",session?.user?.id)
      localStorage.setItem('practiceUserId', JSON.stringify(session?.user?.id));
      console.log("practiceUserId ",localStorage.getItem('practiceUserId'))
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

}
