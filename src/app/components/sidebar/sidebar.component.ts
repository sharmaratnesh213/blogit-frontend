import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  searchForm!: FormGroup;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initiateForm();
    this.loadCategories();
  }

  private initiateForm(): void {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSearch(): void {
    const searchTerm = this.searchForm.value.searchTerm;
    console.log(searchTerm);
    
  }


}
