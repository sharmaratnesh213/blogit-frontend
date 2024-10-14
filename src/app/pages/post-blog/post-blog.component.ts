import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrl: './post-blog.component.css'
})
export class PostBlogComponent implements OnInit {

  blogForm!: FormGroup;
  categories!: Category[];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initiateForm();
    this.loadCategories();
  }

  private initiateForm(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: [''],
      category: [null, Validators.required],
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if(this.blogForm.valid){
      const blogData = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        imageUrl: this.blogForm.value.imageUrl,
        category: {
          id: this.blogForm.value.category
        },
      };

      this.blogService.createBlog(blogData).subscribe({
        next: (data: Blog) => {
        this.router.navigate(['/blogs', data.id]);
      }, 
      error: (error) => {
        console.error('Error creating blog: ', error);
      }
    });
    } else {
      console.error('Form is invalid');
    }
  }

}
