import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  @Input() blogId!: number;
  comments: Comment[] = [];
  commentForm!: FormGroup;

  constructor(private commentService: CommentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initiateForm();
    this.loadComments();
  }

  private initiateForm(): void {
    this.commentForm = this.fb.group({
      content: ['']
    });
  }

  private loadComments(): void {
    this.commentService.getCommentsByBlogId(this.blogId).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  onSubmit(): void {
    const newComment: Comment = {
      content: this.commentForm.value.content,
      blog: { id: this.blogId },
    };

    this.commentService.addComment(newComment).subscribe((comment) => {
      this.comments.push(comment);
      this.commentForm.reset();
    });
  }

}
