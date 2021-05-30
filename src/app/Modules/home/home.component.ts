import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/Services/post.service';
import { Post } from 'src/app/Models/post.model';
import { ɵNullViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  searchValue = "";
  postList: Post[] = [];
  AllPostSubscription: Subscription;
  leaveAComment: string = "";


  constructor(private postService: PostService) { }

  ngOnInit(): void {
   this.AllPostSubscription = this.postService.getAllPost().subscribe(data => {
      for (var e in data){
        this.postList.push(data[e]);
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.postList);
  }

  ngOnDestroy(): void {
    this.AllPostSubscription.unsubscribe();
  }



  postMessage(){
    var newPost: Post = new Post();
    newPost.id = 1;
    newPost.message = this.leaveAComment;
    newPost.likes = 0;

    this.postService.createPost(newPost).subscribe();
    this.postList.push(newPost);
  }
}
