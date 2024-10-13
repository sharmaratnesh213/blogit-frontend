import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
      this.blogs = data;
    });
  }

  navigateToDetail(blogId?: number): void {
    console.log(blogId);
  }

}
