import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';



export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user is logged in...
  // If not, redirect the user to the login page
  const router=inject(Router);

  let user: any;
  let loggedIn: any;
  let supabaseService: SupabaseService = new SupabaseService();
  supabaseService.authChanges((event, session) => {
    user = session?.user;
    loggedIn = (session?.user != null);
    //console.log(session?.user)
    localStorage.setItem('practiceUserId', JSON.stringify(session?.user?.id));
  });
 
  console.log("auth user: ",user);
  console.log("auth loggedIn: ",loggedIn);
  if (loggedIn !== "undefined"){
    console.log("true");
    return true;
  }
  else
  {
    console.log("false");
    localStorage.removeItem('practiceUserId');
    router.navigate(['/']);
    return false;
  }
};
function ngOnInit() {
  throw new Error('Function not implemented.');
}

