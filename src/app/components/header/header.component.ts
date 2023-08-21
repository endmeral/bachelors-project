import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Equation Plotter'; 
  home: string = 'Home';
  library: string = 'Library';
  about: string = 'About'
  faGithub = faGithub;

  toggleAddEquation() {
    console.log('add');
  }
}
