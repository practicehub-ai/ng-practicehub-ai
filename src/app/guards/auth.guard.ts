import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user is logged in...
  // If not, redirect the user to the login page
  const router=inject(Router);
  const loggedIn = localStorage.getItem('practiceUserId');
 
  console.log("Type of loggedIn ",typeof loggedIn);
  console.log("loggedIn ",loggedIn);

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

