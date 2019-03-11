import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule'},
    {path: 'index', loadChildren: './index/index.module#IndexPageModule'},
    {path: 'task-details', loadChildren: './task-details/task-details.module#TaskDetailsPageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    {path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule'},
    {path: 'complaint-center', loadChildren: './complaint-center/complaint-center.module#ComplaintCenterPageModule'},
    {path: 'money-making', loadChildren: './money-making/money-making.module#MoneyMakingPageModule'},
    {path: 'bindtaobao', loadChildren: './bindtaobao/bindtaobao.module#BindtaobaoPageModule'},
    {path: 'bindcard', loadChildren: './bindcard/bindcard.module#BindcardPageModule'},
    {path: 'userinfo', loadChildren: './userinfo/userinfo.module#UserinfoPageModule'},
    {path: 'id-card-info', loadChildren: './id-card-info/id-card-info.module#IdCardInfoPageModule'},
    {path: 'change-tel', loadChildren: './change-tel/change-tel.module#ChangeTelPageModule'},
    {path: 'change-pwd', loadChildren: './change-pwd/change-pwd.module#ChangePwdPageModule'},
    {path: 'id-card-info-sure', loadChildren: './id-card-info-sure/id-card-info-sure.module#IdCardInfoSurePageModule'},
    {path: 'taobao-task', loadChildren: './taobao-task/taobao-task.module#TaobaoTaskPageModule'},
    {path: 'look-task', loadChildren: './look-task/look-task.module#LookTaskPageModule'},
    {path: 'commission', loadChildren: './commission/commission.module#CommissionPageModule'},
    {path: 'get-money', loadChildren: './get-money/get-money.module#GetMoneyPageModule'},
    {path: 'get-money-detail', loadChildren: './get-money-detail/get-money-detail.module#GetMoneyDetailPageModule'},
    {
        path: 'operation-instructions',
        loadChildren: './operation-instructions/operation-instructions.module#OperationInstructionsPageModule'
    },
    {path: 'task-order', loadChildren: './task-order/task-order.module#TaskOrderPageModule'},
    {path: 'task-detailss', loadChildren: './task-detailss/task-detailss.module#TaskDetailssPageModule'},
    {path: 'talk', loadChildren: './talk/talk.module#TalkPageModule'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
