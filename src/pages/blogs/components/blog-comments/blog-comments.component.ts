import { Component, Injector, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavParams } from '@ionic/angular';
import { map } from 'rxjs/internal/operators/map';
import { Extender } from '../../../../shared/helpers/extender';
import { IBlog, IBlogComment, IUser } from '../../../../shared/models';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent extends Extender implements OnInit {
  public blog: IBlog;
  public blogCommentRef: AngularFirestoreCollection<IBlogComment>;
  public comments: IBlogComment[] = [];
  public message: string;
  public user: IUser;
  public comment: IBlogComment;

  constructor(protected injector: Injector, private navParams: NavParams) {
    super(injector);
  }

  public ngOnInit() {
    this.blog = this.navParams.get('data');
    this.user = this.auth$.user;
    this.blogCommentRef = this.afStore$
      .doc(`blogs/${this.blog.id}`)
      .collection('comments');
    this.blogCommentRef
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as IBlogComment;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((comments) => (this.comments = comments));
  }

  public add(message: any) {
    if (!this.comment) {
      this.comment = {
        text: message,
        name: this.user.fullname,
        uid: this.user.uid,
        picture: this.user.profileImage,
        date: new Date().getTime()
      };
      this.blogCommentRef.add(this.comment).then(() => {
        this.comment = null;
        this.message = '';
      });
    } else {
      this.comment.text = message;
      this.comment.date = new Date().getTime();
      this.blogCommentRef
        .doc(this.comment.id)
        .set(this.comment, { merge: true })
        .then(() => {
          this.comment = null;
          this.message = '';
        });
    }
  }

  public edit(item: IBlogComment) {
    this.comment = item;
    this.message = item.text;
  }

  public delete(item, index) {
    this.blogCommentRef.doc(item.id).delete();
  }
}
