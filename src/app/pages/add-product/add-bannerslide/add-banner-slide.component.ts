import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerSlideService } from './banner-slide.service';

@Component({
  selector: 'app-add-banner-slide',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-banner-slide.component.html',
  styleUrls: ['./add-banner-slide.component.scss']
})
export class AddBannerSlideComponent {
  bannerForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private bannerSlideService: BannerSlideService
  ) {
    this.bannerForm = this.fb.group({
      titleText: ['', Validators.required],
      summaryText: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }
  
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void {
    
    if (this.bannerForm.valid) {
      const formData = new FormData();
      const formValue = this.bannerForm.value;

      formData.append('titleText', formValue.titleText);
      formData.append('summaryText', formValue.summaryText);
      formData.append('productType', '8'); // ფიქსირებული
      formData.append('status', 'true');   // აქტიური

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.bannerSlideService.addBannerSlide(formData).subscribe({
        next: () => {
          alert('სლაიდი წარმატებით დაემატა!');
          this.bannerForm.reset();
          this.selectedImage = null;
        },
        error: err => {
          console.error('შეცდომა:', err);
          alert('დამატება ვერ მოხერხდა.');
        }
      });
    } else {
      alert('გთხოვ შეავსე ყველა სავალდებულო ველი.');
    }
  }
}
