import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user is logged in...
  // If not, redirect the user to the login page
  const router=inject(Router);

  let practiceUserId:string|null = localStorage.getItem('practiceUserId');
  console.log(practiceUserId);
  if (practiceUserId!=null || practiceUserId!="" || practiceUserId!="undefined") {
    console.log("true");
    return true;
  }
  else
  {
    console.log("false");
    router.navigate(['/']);
    return false;
  }
};
