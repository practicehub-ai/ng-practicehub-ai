import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  //private supabase: SupabaseClient<Database>;

  constructor() {
    //this.supabase = createClient<Database>(
     // environment.supabaseUrl,
     // environment.supabaseKey
    //);
  }
}
