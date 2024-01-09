import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { toSignal} from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <ul>
      @for (post of redditData(); track post.permalink){
        <li>{{ post.data.title }}</li>
      }
    </ul>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private http = inject(HttpClient);

  redditData = toSignal(
    this.http
    .get('https://www.reddit.com/r/gifs/new/.json?limit=10')
    //this is our observable stream
    .pipe(map((res: any) => res.data.children))
    //we use the map (from Rxjs) to only get the data we want/need 
    //this here is specific to the reddit API
  );
}
