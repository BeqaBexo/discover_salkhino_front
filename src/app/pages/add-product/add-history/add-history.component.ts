import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryService } from './history.service';



@Component({
  selector: 'app-add-history',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.scss']
})
export class AddHistoryComponent {
  historyForm: FormGroup;
  selectedAvatar: File | null = null;

  constructor(
    private fb: FormBuilder,
    private historyService: HistoryService
  ) {
    this.historyForm = this.fb.group({
      title: ['', Validators.required],
      narratorName: ['', Validators.required],
      narratorSurname: ['', Validators.required],
      summary: ['', [Validators.required, Validators.maxLength(1000)]],
      fullText: ['', Validators.required],
    });
  }

  onAvatarSelected(event: any): void {
    this.selectedAvatar = event.target.files[0];
  }

  onSubmit(): void {
    if (this.historyForm.valid) {
      const formData = new FormData();
      const formValue = this.historyForm.value;

      for (const key in formValue) {
        formData.append(key, formValue[key]);
      }

      if (this.selectedAvatar) {
        formData.append('avatar', this.selectedAvatar);
      }

      this.historyService.addHistory(formData).subscribe({
        next: () => {
          alert('ისტორია წარმატებით დაემატა!');
          this.historyForm.reset();
          this.selectedAvatar = null;
        },
        error: err => {
          console.error('შეცდომა:', err);
          alert('დამატება ვერ მოხერხდა.');
        }
      });
    } else {
      alert('შეავსე ყველა სავალდებულო ველი.');
    }
  }
}
