import Home from './views/Home.vue'
import About from './views/About.vue'
import Favourites from './views/Favourites.vue'
import DiscoverMovies from './views/DiscoverMovies.vue'
import DiscoverShows from './views/DiscoverShows.vue'
import SearchMovies from './views/SearchMovies.vue'
import SearchShows from './views/SearchShows.vue'

export default [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/favourites', component: Favourites },
    { path: '/discover-movies', component: DiscoverMovies },
    { path: '/discover-shows', component: DiscoverShows },
    { path: '/search-movies', component: SearchMovies },
    { path: '/search-shows', component: SearchShows },
]