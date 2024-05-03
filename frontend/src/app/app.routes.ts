import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ReelsComponent } from './reels/reels.component';
import { PostComponent } from './post/post.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    {
        path: "home", component: NavbarComponent,
        children: [
            {
                path: "", component: HomeComponent,
                children: [
                    { path: "", redirectTo: "posts", pathMatch: 'full' },
                    { path: "videos/:posts", component: ReelsComponent },
                    { path: "posts", component: PostComponent },
                    { path: "friends", component: FriendsComponent },
                ]
            },
            { path: "profile", component: ProfileComponent },
            { path: "message", component: MessageComponent },
        ]
    },

];
