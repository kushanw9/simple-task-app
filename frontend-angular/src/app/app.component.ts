import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-angular';
  something = 'some text';

  myMethod(): void {
    this.something = 'Some random value: ' + Math.random();
  }
}
