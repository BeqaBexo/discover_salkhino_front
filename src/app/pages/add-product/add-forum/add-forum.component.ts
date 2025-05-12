import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddService } from '../add-product-service/add-service.service';
import { Forum, ForumComment, Image } from '../add-product-service/add-service.model';
import { ForumService } from './forum-service.service';



@Component({
  selector: 'app-add-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-forum.component.html',
  styleUrl: './add-forum.component.scss'
})
export class AddForumComponent {
  forumForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private forumService: ForumService) {

    this.forumForm = this.fb.group({
      forumTitle: ['', Validators.required],
      forumRegion: ['', Validators.required],
      forumSummary: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.forumForm.valid) {
      // Create a Forum object from the form values
      const forumData: Forum = {
        id: 0, // Default ID for new forum
        title: this.forumForm.value.forumTitle,
        region: this.forumForm.value.forumRegion,
        summary: this.forumForm.value.forumSummary,
        likes: 0, // Default likes for a new forum
        isExpanded: false, // Default state
        showComments: false, // Default state
        comments: [], // Empty array for comments
      };
  
      // Send the JSON object to the backend via the service
      this.forumService.createForum(forumData).subscribe({
        next: (response) => {
          console.log('Forum added successfully:', response);
          alert('Forum data submitted successfully!');
          this.forumForm.reset(); // Reset the form after submission
        },
        error: (error) => {
          console.error('Error submitting forum data:', error);
          alert('Failed to submit forum data. Please try again.');
        },
      });
    } else {
      console.log('Submit logic for other tabs can go here.');
    }
  }
  
  
  
  
  
}