import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(
    private blogService: BlogService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      const search = params['search'];
      if (categoryId) {
        this.fetchBlogsByCategory(categoryId);
      } 

      else if (search) {
        this.blogService.searchBlogs(search).subscribe((data: Blog[]) => {
          this.blogs = data;
        });
      }
      
      else {
        this.fetchAllBlogs();
      }
    });
  }

  fetchAllBlogs(): void {
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
      this.blogs = data;
    });
  }

  fetchBlogsByCategory(categoryId: number): void {
    this.blogService.getBlogsByCategoryId(categoryId).subscribe((data: Blog[]) => {
      this.blogs = data;
    });
  }

  navigateToDetail(blogId?: number): void {
    this.router.navigate(['/blogs', blogId]);
  }

}
