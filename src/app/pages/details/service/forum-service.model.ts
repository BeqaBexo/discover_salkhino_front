export class Forum {
    id: number = 0;
    title: string = '';
    region: string = '';
    summary: string = '';
    likes: number = 0;
    isExpanded: boolean = false;
    showComments: boolean = false;
    comments?: ForumComment[] = [];
  }
  
  export class ForumComment {
    forumId: number = 0;
    user: string = '';
    text: string = '';
    isDeleted: boolean = false;
  }
  