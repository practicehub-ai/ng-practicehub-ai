import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  private supabase: SupabaseClient;
  subid: number = 0;
  contents: any = [];
  contentsTable: any = [];

  constructor(private route: ActivatedRoute) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.route.queryParams.subscribe(params => { this.subid = Number(params['subid']); });
  }
  ngOnInit() {
    this.fetchContents();
  }
  async getContents() {
    const { data, error } = await this.supabase.from('Chapters').select('*').eq('SubjectId', this.subid);
    console.log(data);
    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
  async fetchContents() {
    this.contents = await this.getContents(); 
    this.contentsTable = this.contents.map((content: any) => {
      return {
        id: content.id,
        section: content.Section,
        topic: content.Topic,
        content: content.Content
      }
    });   
  }
}
