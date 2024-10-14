import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { Comment } from '../../models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBlogDetails();
    this.loadComments();
  }

  private loadBlogDetails(): void {
    this.blogService.getBlogById(this.blogId).subscribe((data: Blog) => {
      this.blog = data;
      this.checkIfAuthor();
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

  editBlog(): void {
    this.router.navigate(['/blog/edit', this.blogId]);
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blogId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
