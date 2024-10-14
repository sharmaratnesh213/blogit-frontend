import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit {

  blogForm!: FormGroup;
  categories!: Category[];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<EditBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: [''],
      category: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.blogForm.patchValue(this.data);
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blogData = {
        id: this.data.id,
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        imageUrl: this.blogForm.value.imageUrl,
        category: this.blogForm.value.category,
      };

      this.blogService.updateBlog(blogData).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error updating blog:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }


}
