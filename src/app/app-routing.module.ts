import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostBlogComponent } from './pages/post-blog/post-blog.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [authGuard]},
  {path: 'blogs/:id', component: BlogDetailComponent},
  {path: 'blog/create', component: PostBlogComponent},
  {path: 'profile/:id', component: ProfileComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
