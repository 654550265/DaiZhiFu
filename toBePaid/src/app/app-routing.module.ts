import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule'},
    {path: 'index', loadChildren: './index/index.module#IndexPageModule'},
    {path: 'task-details', loadChildren: './task-details/task-details.module#TaskDetailsPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule' },
  { path: 'userinfo', loadChildren: './userinfo/userinfo.module#UserinfoPageModule' },
  { path: 'bindtaobao', loadChildren: './bindtaobao/bindtaobao.module#BindtaobaoPageModule' },
  { path: 'bindcard', loadChildren: './bindcard/bindcard.module#BindcardPageModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
