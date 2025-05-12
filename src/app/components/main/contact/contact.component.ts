import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  submitForm() {
    // აქ დაამატე API ან ელ.ფოსტაზე გაგზავნა
    console.log('წარდგენილია:', this.name, this.email, this.message);
  }
}
