import { Component, OnInit } from '@angular/core';
import { Forum, ForumComment } from '../../service/forum-service.model';
import { ForumService } from '../../service/forum-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';


@Component({
  selector: 'app-show-forume',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, PaginationComponent],
  templateUrl: './show-forume.component.html',
  styleUrls: ['./show-forume.component.scss'],
})
export class ShowForumeComponent implements OnInit {
  forums: Forum[] = [];
  displayedForums: Forum[] = []; // Paginated forums
  newComment: { [key: number]: string } = {};
  user: string = 'აღმოაჩინე სალხინო';
  itemsPerPage: number = 5; // Default items per page

  constructor(public forumService: ForumService) {}

  ngOnInit(): void {
    this.fetchForums();
  }

  fetchForums(): void {
    this.forumService.getAllForums().subscribe({
      next: (forums) => {
        this.forums = forums.map((forum) => ({
          ...forum,
          showComments: false,
          isExpanded: false,
          comments: [],
        }));

        // Fetch comments for each forum
        this.forums.forEach((forum) => {
          this.forumService.getForumComments(forum.id).subscribe({
            next: (comments) => {
              forum.comments = comments;
            },
            error: (err) => {
              console.error(`Error fetching comments for forum ID ${forum.id}:`, err);
            },
          });
        });

        // Initialize with the first page of items
        this.displayedForums = this.forums.slice(0, this.itemsPerPage);
      },
      error: (err) => console.error('Error fetching forums:', err),
    });
  }

  onPageChange(items: Forum[]): void {
    this.displayedForums = items; // Update displayed forums for the current page
  }

  toggleComments(forumId: number): void {
    const forum = this.forums.find((f) => f.id === forumId);
    if (forum) {
      forum.showComments = !forum.showComments;
    }
  }

  expandArticle(forum: Forum): void {
    forum.isExpanded = true;
  }

  collapseArticle(forum: Forum): void {
    forum.isExpanded = false;
  }

  addComment(forumId: number): void {
    const forum = this.forums.find((f) => f.id === forumId);

    if (forum && this.newComment[forumId]?.trim()) {
      const comment: Omit<ForumComment, 'id'> = {
        forumId,
        user: this.user,
        text: this.newComment[forumId],
        isDeleted: false,
      };

      this.forumService.addForumComment(comment).subscribe({
        next: (data) => {
          forum.comments = forum.comments || [];
          forum.comments.push(data);
          this.newComment[forumId] = ''; // Clear the input
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        },
      });
    } else {
      console.error('Invalid forum or empty comment.');
    }
  }
}
