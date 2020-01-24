import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../shared/common/common.module';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogCommentsComponent } from './components/blog-comments/blog-comments.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DietBlogItemComponent } from './components/diet-blog-item/diet-blog-item.component';
import { FitnessBlogItemComponent } from './components/fitness-blog-item/fitness-blog-item.component';
import { LifestyleBlogItemComponent } from './components/lifestyle-blog-item/lifestyle-blog-item.component';

@NgModule({
  declarations: [
    BlogsComponent,
    LifestyleBlogItemComponent,
    DietBlogItemComponent,
    FitnessBlogItemComponent,
    BlogCommentsComponent,
    BlogDetailComponent,
    AddBlogComponent
  ],
  entryComponents: [AddBlogComponent, BlogCommentsComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogsComponent
      },
      {
        path: ':id',
        component: BlogDetailComponent
      }
    ])
  ]
})
export class BlogsModule {}
