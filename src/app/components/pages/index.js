// общие компоненты
import HomePage from 'app_components/pages/home-page/HomePage';
import NotFoundPage from 'app_components/pages/not-found-page/NotFoundPage';

// список пользователей
import UsersToolbar from 'app_components/pages/users-page/UsersToolbar';
import UsersPage from 'app_components/pages/users-page/UsersPage/UsersPage';

// карточка пользователя
import UserCardPage from 'app_components/pages/user-card-page/UserCardPage';

// список фильмов
import MoviesToolbar from 'app_components/pages/movies-page/MoviesToolbar/MoviesToolbar';
import MoviesList from 'app_components/pages/movies-page/MoviesList/MoviesList';
import MovieItem from 'app_components/pages/movies-page/MovieItem/MovieItem';
import MoviesPaging from 'app_components/pages/movies-page/MoviesPaging/MoviesPaging';

// карточка фильма
import MoviePage from 'app_components/pages/movie-page/MoviePage/MoviePage';
import Credits from 'app_components/pages/movie-page/Credits/Credits';

export {
  HomePage,
  NotFoundPage,

  UsersToolbar,
  UsersPage,
  UserCardPage,

  MoviesToolbar,
  MoviesList,
  MovieItem,
  MoviesPaging,

  MoviePage,
  Credits
};