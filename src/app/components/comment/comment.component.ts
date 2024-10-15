import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  @Input() blogId!: number;
  comments: Comment[] = [];
  commentForm!: FormGroup;
  loggedInUser!: User | null;

  constructor(private commentService: CommentService, 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    this.loadComments();
    this.loggedInUser = this.authService.getUser();
  }

  private initiateForm(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  private loadComments(): void {
    this.commentService.getCommentsByBlogId(this.blogId).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  onSubmit(): void {
    if(!this.commentForm.valid) {
      return;
    }

    if(!this.loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }

    const newComment: Comment = {
      content: this.commentForm.value.content,
      blog: { id: this.blogId },
    };

    this.commentService.addComment(newComment).subscribe((comment) => {
      this.comments.push(comment);
      this.commentForm.reset();
      this.commentForm.controls['content'].setErrors(null);
      this.commentForm.markAsPristine();
      this.commentForm.markAsUntouched();
    });
  }

}
