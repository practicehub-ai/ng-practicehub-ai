import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-new',
  templateUrl: './content-new.component.html',
  styleUrls: ['./content-new.component.css']
})
export class ContentNewComponent {
  
  private supabase: SupabaseClient;
  subid: number = 0;
  contents: any = [];
  contentsTable: any = [];
  previousSection: any = '';
  clonedContents:any = [];


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
    this.clonedContents = [];  
    let previousTopic = '';
    let str = '';
    let currIndex = 0;

    for(var i=0;i<this.contents.length;i++) {   
      let currObj = this.contents[i];
      if(currObj.Topic != previousTopic) {
        previousTopic = currObj.Topic;
        str = currObj.Content.trim()+', ';
        currIndex = i;
        this.clonedContents.push(currObj);
      } else {
        str += currObj.Content.trim()+', ';
      }
      this.clonedContents[this.clonedContents.length-1].Content=str;
    }

    let categorizedContents =  [...this.clonedContents];

    categorizedContents.forEach((obj:any) => {           
      if(this.previousSection != obj.Section) {
        this.previousSection = obj.Section;
      } else {
        obj.Section = '';
      }
     }); 

     console.log("--------")
     console.log(categorizedContents)
     
    this.contentsTable = categorizedContents.map((content: any) => {
      return {
        id: content.id,
        section: content.Section,
        topic: content.Topic,
        content: content.Content
      }
    });   
  }
}
