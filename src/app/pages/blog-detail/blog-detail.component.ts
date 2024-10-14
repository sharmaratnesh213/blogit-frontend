import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { Comment } from '../../models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBlogComponent } from '../../components/edit-blog/edit-blog.component';
import { LikeService } from '../../services/like.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {

  blog!: Blog | undefined;
  blogId!: number;
  comments: Comment[] = [];
  isAuthor: boolean = false;
  loggedInUser!: User | null;
  isLiked!: boolean;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService,
    private likeService: LikeService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.loggedInUser = this.authService.getUser();
    this.loadBlogDetails();
    this.loadComments();
  }

  private loadBlogDetails(): void {
    this.blogService.getBlogById(this.blogId).subscribe((data: Blog) => {
      this.blog = data;
      this.checkIfAuthor();
      this.hasUserLikedBlog();
    });
  }

  private loadComments(): void {
    this.commentService.getCommentsByBlogId(this.blogId).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  private checkIfAuthor(): void {
    const loggedInUser = this.authService.getUser();
    if(loggedInUser && this.blog?.user?.id === loggedInUser.id){
      this.isAuthor = true;
    }
  }

  hasUserLikedBlog(): void {
    this.likeService.hasUserLikedBlog(this.loggedInUser?.id!, this.blog?.id!).subscribe((data: boolean) => {
      this.isLiked = data;
    });
  }

  likeBlog(): void {
    if(this.blog){
      this.likeService.likeBlog(this.blog.id!).subscribe({
        next: (response: string) => {
          this.isLiked = true;
          this.loadBlogDetails();
        },
        error: (error) => {
          console.error('Error liking blog:', error);
        }
      });
    }
  }

  unlikeBlog(): void {
    if(this.blog){
      this.likeService.unlikeBlog(this.blog.id!).subscribe({
        next: (response: string) => {
          this.isLiked = false;
          this.loadBlogDetails();
        },
        error: (error) => {
          console.error('Error unliking blog:', error);
        }
      });
    }
  }

  editBlog(): void {
    const dialogRef = this.dialog.open(EditBlogComponent, {
      data: this.blog,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.loadBlogDetails();
      },
      error: (error) => {
        console.error('Error updating blog:', error);
      }
    });
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blogId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
