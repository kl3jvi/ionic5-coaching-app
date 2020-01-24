import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog } from '../../../../shared/models';
import { AddBlogComponent } from '../add-blog/add-blog.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent extends Extender implements OnInit {
  public blogs: IBlog[] = [];
  public selectedSegment: string;
  public get segmentBlogs(): IBlog[] {
    return this.blogs.filter((blog) => blog.type === this.selectedSegment);
  }
  private blogRef: AngularFirestoreCollection<IBlog>;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    this._getBlogs();
  }

  public segmentChanged(ev: any): void {
    this.selectedSegment = ev.detail.value;
  }

  public async openBlog(post: IBlog): Promise<any> {
    this.gotoPage(`${this.routes.blogs}/${post.id}`);
  }

  public async openAdd(type: string, post = null): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: AddBlogComponent,
      componentProps: { data: post, type },
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  public async add(): Promise<any> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Create/ Update a blog',
      buttons: [
        {
          text: 'Mental Health',
          handler: () => {
            this.openAdd('diet');
          }
        },
        {
          text: 'Yoga',
          handler: () => {
            this.openAdd('fitness');
          }
        },
        {
          text: 'Lifestyle',
          handler: () => {
            this.openAdd('lifestyle');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }

  private _getBlogs(): void {
    this.status = 'load';

    this.blogRef = this.afStore$.collection('blogs');
    this.blogRef
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as IBlog;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((blogs) => {
        this.status = '';
        this.blogs = blogs;
      });
  }
}
