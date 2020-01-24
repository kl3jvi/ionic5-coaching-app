import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog } from '../../../../shared/models';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { BlogCommentsComponent } from '../blog-comments/blog-comments.component';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent extends Extender implements OnInit {
  public blog: IBlog = null;
  public blogRef: AngularFirestoreDocument<IBlog>;
  public likes: any[];

  constructor(
    protected injector: Injector,
    private _socialShare: SocialSharing
  ) {
    super(injector);
  }

  public ngOnInit() {
    this.status = 'load';
    this.blogRef = this.afStore$.doc(
      `blogs/${this.activatedRoute.snapshot.params.id}`
    );
    this.blogRef.valueChanges().subscribe((blog) => {
      this.status = '';
      blog.id = this.activatedRoute.snapshot.params.id;
      this.blog = blog;
    });

    this.blogRef
      .collection('likes')
      .valueChanges()
      .subscribe((likes) => (this.likes = likes));
  }

  public like() {
    this.blogRef.collection('likes').add({ uid: this.auth$.user.uid });
  }

  public get likedByUser() {
    return this.likes.find((like) => like.uid === this.auth$.user.uid);
  }

  public async comment() {
    const modal = await this.modalCtrl.create({
      component: BlogCommentsComponent,
      componentProps: { data: this.blog }
    });

    modal.present();
  }

  public async edit() {
    const modal = await this.modalCtrl.create({
      component: AddBlogComponent,
      componentProps: { data: this.blog }
    });

    modal.present();
  }

  public share() {
    this._socialShare
      .share(this.blog.content, this.blog.title, null, null)
      .then()
      .catch((error) => this.toast(error));
  }

  public delete() {
    this.blogRef.delete().then(() => {
      this.toast('Blog post deleted');
      this.back();
    });
  }
}
