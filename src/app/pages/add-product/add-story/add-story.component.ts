import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoryService } from './story.service';


@Component({
  selector: 'app-add-story',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './add-story.component.html',
  styleUrl: './add-story.component.scss'
})
export class AddStoryComponent implements OnInit {
  storyForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private storyService: StoryService) {
    this.storyForm = this.fb.group({
      titleText: ['', Validators.required],
      summaryText: ['', Validators.required],
      fullText: ['', Validators.required]
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
    if (this.storyForm.invalid) {
      alert('გთხოვ შეავსო ყველა სავალდებულო ველი.');
      return;
    }

    const storyData = {
      titleText: this.storyForm.value.titleText,
      summaryText: this.storyForm.value.summaryText,
      fullText: this.storyForm.value.fullText,
      productType: 4,   // 3 = Story
      status: true
    };

    this.storyService.addStory(storyData).subscribe({
      next: (storyId: number) => {
        if (this.selectedFiles.length > 0) {
          const formData = new FormData();
          this.selectedFiles.forEach(file => formData.append('files', file));
          formData.append('productTypeId', '4'); // 3 = Story
          formData.append('objectKey', storyId.toString());

          this.storyService.uploadImages(formData).subscribe({
            next: () => {
              alert('ისტორია წარმატებით დაემატა!');
              this.storyForm.reset();
              this.selectedFiles = [];
            },
            error: (err) => {
              console.error('Image upload failed:', err);
              alert('ისტორია დაემატა, მაგრამ ფოტოები ვერ აიტვირთა.');
            }
          });
        } else {
          alert('ისტორია დაემატა.');
        }
      },
      error: (err) => {
        console.error('Failed to add story:', err);
        alert('დამატება ვერ მოხერხდა.');
      }
    });
  }
}
