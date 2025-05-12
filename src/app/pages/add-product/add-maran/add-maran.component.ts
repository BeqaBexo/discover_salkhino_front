import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaranService } from './maran.service';

@Component({
  selector: 'app-add-maran',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-maran.component.html',
  styleUrls: ['./add-maran.component.scss']
})
export class AddMaranComponent {
  maranForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private maranService: MaranService
  ) {
    this.maranForm = this.fb.group({
      grapeVariety: ['', Validators.required],
      factoryName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9+()\-\s]{6,}$/) // ✅ fixed regex
        ]
      ],
      location: ['', Validators.required],
      harvestYear: [
        new Date().getFullYear(),
        [Validators.required, Validators.min(1900)]
      ],
      weightKg: [0, [Validators.required, Validators.min(1)]],
      pricePerKg: [0, [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.maranForm.invalid) {
      alert('გთხოვ შეავსო ყველა აუცილებელი ველი.');
      return;
    }

    if (this.selectedFiles.length === 0) {
      alert('გთხოვ აირჩიო ფოტოები!');
      return;
    }

    this.maranService.addMaran(this.maranForm.value).subscribe({
      next: (maranId: number) => {
        const formData = new FormData();
        this.selectedFiles.forEach(file => formData.append('files', file));
        formData.append('productTypeId', '3');
        formData.append('objectKey', maranId.toString());

        this.maranService.uploadImages(formData).subscribe({
          next: () => {
            alert('მონაცემი და ფოტოები წარმატებით დაემატა.');
            this.resetForm();
          },
          error: () => {
            alert('მონაცემი დაემატა, მაგრამ ფოტოები ვერ აიტვირთა.');
            this.resetForm();
          }
        });
      },
      error: () => {
        alert('დამატება ვერ მოხერხდა.');
      }
    });
  }

  resetForm(): void {
    this.maranForm.reset();
    this.selectedFiles = [];
  }

  get fileNames(): string {
    return this.selectedFiles.map(f => f.name).join(', ');
  }
}
