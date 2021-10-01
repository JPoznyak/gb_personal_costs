import Vue from 'vue'
import Router from 'vue-router'

// import Dashboard from '../pages/Dashboard'
// import About from '../pages/About'
// import NotFound from '../pages/NotFound'
// import AddPayment from '..components/AddPayment'

Vue.use(Router)

const router =  new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     component: ()=>import('../pages/Login'),
        //     name: 'Login'
        // },
        {
            path: '/dashboard',
            component: ()=>import('../pages/Dashboard'),
            name: 'Dashboard'
        },
        {
            path: '/dashboard/:page',
            component: ()=>import('../pages/Dashboard'),
            name: 'Dashboard'
        },
        {
            path: '/about*',
            component: ()=>import('../pages/About'),
            name: 'About'
        },
        {
            path: '/notfound',
            component: ()=>import('../pages/NotFound'),
            name: 'NotFound'
        },
        {
            path: '/add/payment/Food?amount=200',
            component: ()=>import('../components/AddPayment'),
            name: 'AddPaymentFromUrl'
        },
        {
            path: '/add/payment/:category/',
            component: ()=>import('../components/AddPayment'),
            name: 'AddPaymentFromUrl'
        },
        // {
        //     path: '/auth',
        //     component: ()=>import('../pages/Login'),
        //     name: 'Login'
        // },
        {
            path: "*",
            component: ()=>import('../pages/NotFound')
        }
    ]
})

const isAuth = true

router.beforeEach((to,from, next)=>{
    if(to.name !== 'login' && !isAuth) {
        next({name: 'login'})
    }else {
        next()
    }
})

const titles = routeName => {
    return {
        'Dashboard': 'Take a look on your payments and add more!',
        'About': 'Anything about our awesome applications',
        'NotFound': 'Oops! Seems like we lost this page :('
    }[routeName]
}

router.afterEach((to)=>{
    document.title = titles(to.name)
})

export default router