import { Component } from '@angular/core';
import { SupabaseService } from './supabase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //session = this.supabase.getSession();

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
   //this.supabase.getUser().then((user) => {console.log(user)});
  }
}
