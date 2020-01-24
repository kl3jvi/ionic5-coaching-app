import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: '../pages/auth/auth.module#AuthModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'intro',
    loadChildren: '../pages/intro/intro.module#IntroModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'profile',
    loadChildren: '../pages/profile/profile.module#ProfileModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'notifications',
    loadChildren: '../pages/notifications/notifications.module#NotificationsModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'schedule',
    loadChildren: '../pages/schedule/schedule.module#ScheduleModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'gyms',
    loadChildren: '../pages/gyms/gyms.module#GymsModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'trainers',
    loadChildren: '../pages/trainers/trainers.module#TrainersModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'shop',
    loadChildren: '../pages/shop/shop.module#ShopModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'blogs',
    loadChildren: '../pages/blogs/blogs.module#BlogsModule',
  },
  {
    canActivate: [LoginGuard],
    path: 'setting',
    loadChildren: '../pages/setting/setting.module#SettingModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
