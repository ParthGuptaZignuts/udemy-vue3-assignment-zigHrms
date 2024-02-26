import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bulma/css/bulma.css';
import {router} from "./router"
import { createPinia } from 'pinia';
import { useUsers } from './stores/users';
import { usePosts } from './stores/posts';


const pinia = createPinia();
const app = createApp(App)
app.use(pinia)
const usersStore = useUsers();
const postsStore = usePosts();
Promise.all([
   usersStore.authenticate(),
   postsStore.fetchPosts()
]).then(()=>{
    app.use(router)
    app.mount('#app')
})
