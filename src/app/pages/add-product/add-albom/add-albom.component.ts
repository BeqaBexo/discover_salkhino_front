import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbomService } from './albom.service';

@Component({
  selector: 'app-add-albom',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './add-albom.component.html',
  styleUrl: './add-albom.component.scss'
})
export class AddAlbomComponent implements OnInit {
  albomForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private albomService: AlbomService) {
    this.albomForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(300)]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  get fileNames(): string {
    return this.selectedFiles.map(f => f.name).join(', ');
  }

  onSubmit(): void {
    if (this.albomForm.invalid) {
      alert('გთხოვ შეავსო ყველა სავალდებულო ველი.');
      return;
    }

    const albomData = {
      title: this.albomForm.value.title,
      description: this.albomForm.value.description
    };

    this.albomService.addAlbom(albomData).subscribe({
      next: (albomId: number) => {
        if (this.selectedFiles.length > 0) {
          const formData = new FormData();
          this.selectedFiles.forEach(file => formData.append('files', file));
          formData.append('productTypeId', '2'); // 2 - Albom
          formData.append('objectKey', albomId.toString());

          this.albomService.uploadImages(formData).subscribe({
            next: () => {
              alert('ალბომი წარმატებით დაემატა!');
              this.albomForm.reset();
              this.selectedFiles = [];
            },
            error: (err) => {
              console.error('Image upload failed:', err);
              alert('ალბომი დაემატა, მაგრამ ფოტოები ვერ აიტვირთა.');
            }
          });
        } else {
          alert('ალბომი დაემატა.');
        }
      },
      error: (err) => {
        console.error('Failed to add albom:', err);
        alert('დამატება ვერ მოხერხდა.');
      }
    });
  }
}
