import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
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
