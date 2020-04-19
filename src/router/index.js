import Vue from 'vue'
import Router from 'vue-router'
import BlogIndex from '@/components/BlogIndex'
import Login from '@/components/Login/Login'
import AdminIndex from '@/components/AdminIndex/AdminIndex'
import AdminArticleList from '@/components/AdminContents/AdminArticleList'
import AdminArticleWrite from '@/components/AdminContents/AdminArticleWrite'
import AdminInfo from '@/components/AdminContents/AdminInfo'

import LeafletIndex from '@/components/LeafletIndex/LeafletIndex'
import LeafletUpLoad from '@/components/LeafletUpLoad/LeafletUpLoad'
import CesiumIndex from '@/components/CesiumIndex/CesiumIndex'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'BlogIndex',
        component: BlogIndex
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        /* children:[
          {path:'/userlist',component:UserList},
          {path:'/olduser',component:OldUser},
          {path:'/newuser',component:NewUser} 
        ]*/
    },
    {
        path: '/admin',
        name: 'AdminIndex',
        component: AdminIndex,
        children: [{
            path: '/AdminArticleList',
            component: AdminArticleList
        },
        {
            path: '/AdminArticleWrite',
            component: AdminArticleWrite
        },
        {
            path:'/AdminInfo',
            component:AdminInfo
        } 
        ]
    },
    {
        path: '/cesium',
        name: 'CesiumIndex',
        component: CesiumIndex,
        /*  {path:'/AdminArticleWrite',component:AdminArticleWrite},
         {path:'/newuser',component:NewUser}  */

    },
    {
        path: '/leaflet',
        name: 'LeafletIndex',
        component: LeafletIndex,
        /*  {path:'/AdminArticleWrite',component:AdminArticleWrite},
         {path:'/newuser',component:NewUser}  */

    },
    {
        path: '/leafletUpLoad',
        name: 'leafletUpLoad',
        component: LeafletUpLoad,
    }
    ]
})
