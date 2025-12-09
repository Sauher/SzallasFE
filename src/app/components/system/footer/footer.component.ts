import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() title:string = "";
  @Input() author:string = "";
  @Input() aboutUs:string = "";
  @Input() cim:string = "";
  @Input() email:string = "";

}
