import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Gooey } from 'ngx-gooey';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Gooey],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-detective';
}
