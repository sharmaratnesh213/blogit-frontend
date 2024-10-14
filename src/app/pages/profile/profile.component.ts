import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user!: User | null;
  userBlogs: Blog[] = [];
  likedBlogs: Blog[] = [];
  
  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private likeService: LikeService 
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadUserBlogs();
    this.loadLikedBlogs();
  }

  private loadUserBlogs(): void {
    if(this.user){
      this.blogService.getBlogsByUserId(this.user.id!).subscribe((data: Blog[]) => {
        this.userBlogs = data;
      });
    }
  }

  private loadLikedBlogs(): void {
    if(this.user){
      this.likeService.getBlogsLikedByUser(this.user.id!).subscribe((data: Blog[]) => {
        this.likedBlogs = data;
      });
    }
  }

  editProfile(): void {
    console.log('Edit Profile');
  }
}
