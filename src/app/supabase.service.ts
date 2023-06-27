import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

export interface IUser {
  email: string;
  name: string;
  website: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
     this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
  public async getUser() {
    const { data: { user } } = await this.supabaseClient.auth.getUser()
    return user;//this.supabaseClient.auth.getUser();
  }
  public async getSession() {
    const { data, error } = await this.supabaseClient.auth.getSession()
    return data;//this.supabaseClient.auth.getSession();
  }
  // public getProfile(): PromiseLike<any> {
  //   const user = this.getUser().then((user) => {return user});

  //   return this.supabaseClient.from('profiles')
  //   .select('username, website, avatar_url')
  //   .eq('id', user?.id)
  //   .single();
  // }
  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): any {
    return this.supabaseClient.auth.onAuthStateChange(callback);
  }
  public signIn(email: string): Promise<any> {
    return this.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  async signInWithProvider(provider: string): Promise<void> {
    await this.supabaseClient.auth.signInWithOAuth({ provider: 'google' });
  }
  public signOut(): Promise<any> {
    return this.supabaseClient.auth.signOut();
  }
  // public updateProfile(userUpdate: IUser): any {
  //   const user = this.getUser();

  //   const update = {
  //     username: userUpdate.name,
  //     website: userUpdate.website,
  //     id: user?.id,
  //     updated_at: new Date(),
  //   };

  //   return this.supabaseClient.from('profiles').upsert(update, {
  //     returning: 'minimal', // Do not return the value after inserting
  //   });
  // }
}
