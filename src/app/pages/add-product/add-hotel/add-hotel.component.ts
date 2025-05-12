import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from './hotel.service';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent {
  hotelForm: FormGroup;
  selectedFiles: File[] = [];
  selectedFileName: string = '';

  constructor(private fb: FormBuilder, private hotelService: HotelService) {
    this.hotelForm = this.fb.group({
      title: ['', Validators.required],
      descrip: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      weight: [''],
      isActive: [true]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.selectedFileName = this.selectedFiles.map(file => file.name).join(', ');
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      alert('შეავსე ყველა სავალდებულო ველი.');
      return;
    }

    const data = this.hotelForm.value;
    data.insertDatetime = new Date();

    this.hotelService.addHotel(data).subscribe({
      next: (hotelId: number) => {
        if (this.selectedFiles.length > 0) {
          const formData = new FormData();
          this.selectedFiles.forEach(file => formData.append('files', file));
          formData.append('productTypeId', '6');
          formData.append('objectKey', hotelId.toString());

          this.hotelService.uploadImages(formData).subscribe({
            next: () => {
              alert('სასტუმრო და ფოტოები დაემატა წარმატებით!');
              this.hotelForm.reset();
              this.selectedFiles = [];
              this.selectedFileName = '';
            },
            error: () => alert('სასტუმრო დაემატა, მაგრამ ფოტოები ვერ აიტვირთა.')
          });
        } else {
          alert('სასტუმრო დაემატა წარმატებით.');
          this.hotelForm.reset();
          this.selectedFiles = [];
          this.selectedFileName = '';
        }
      },
      error: () => alert('დამატება ვერ მოხერხდა.')
    });
  }

  get fileNames(): string {
    return this.selectedFiles.length > 0
      ? this.selectedFiles.map(f => f.name).join(', ')
      : '';
  }
}
