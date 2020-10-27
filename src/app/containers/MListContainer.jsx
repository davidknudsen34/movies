import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';
import { DEFAULT_LANGUAGE } from 'app_i18n';
import { redirect } from 'app_history';
import { isEmpty, getDiffMethod } from 'app_services/UtilsService';
import { MoviesPage } from 'app_components/pages';

import {
  getMovies,
  getGenres,
  resetMovieDetails
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ moviesGenres, moviesList }) => {
  return {
    moviesGenres,
    moviesList
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovies,
      getGenres,
      resetMovieDetails
    }, dispatch)
  };
};

class MListContainer extends Component {
  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.linkMovie = this.linkMovie.bind(this);
    this.hasUrlQueryDiffs = this.hasUrlQueryDiffs.bind(this);
    this.update = this.update.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    store.dispatch(getGenres());
    store.dispatch(getMovies(urlQuery));
  }

  componentWillUnmount() {
    // console.warn('\n -- MListContainer.componentWillUnmount');
  }

  componentDidUpdate() {
    // console.log('\n -- MListContainer.componentDidUpdate');
    const { moviesList, actions, history } = this.props;
    const searchObject = qs.parse(history.location.search);

    if (this.hasUrlQueryDiffs(moviesList.request)) {
      actions.getMovies(searchObject);
    };
  }

  componentDidMount() {
    // console.log('\n -- MListContainer.componentDidMount');

    const { moviesList, moviesGenres, history, actions } = this.props;
    const searchObject = qs.parse(history.location.search);

    if (isEmpty(moviesGenres.data)) {
      actions.getGenres();
    };

    if (
      isEmpty(moviesList.data.results) ||
      this.hasUrlQueryDiffs(moviesList.request)
    ) {
      actions.getMovies(searchObject);
    };
  }

  // проверяем различия параметров последнего запроса (ключи объекта request) в store с: 
  // 1. значениями этих параметров из url search query или 
  // (опционально) 2. дефолтными значениями этих из редюсера
  hasUrlQueryDiffs(request) {
    const hasDiffs = getDiffMethod(request);

    const list = [
      { key: 'lng', defaultValue: DEFAULT_LANGUAGE.value },
      { key: 'page', defaultValue: 1 },
      { key: 'moviesType', defaultValue: DEFAULT_MOVIES_TYPE }
    ];

    return list.some(
      (item) => hasDiffs(item.key, {
        withDefault: true,
        defaultValue: item.defaultValue
      })
    );
  }

  linkMovie(id) {
    const { history, actions } = this.props;
    const { lng } = qs.parse(history.location.search);
    const nextParams = { lng };

    actions.resetMovieDetails();
    redirect(`/movies/${id}?${qs.stringify(nextParams)}`);
  }

  update(nextValues) {
    const { history, actions } = this.props;
    const values = qs.parse(history.location.search);
    const nextParams = { ...values, ...nextValues };

    redirect(`/movies?${qs.stringify(nextParams)}`);
    actions.getMovies(nextParams);
  }

  handleFilter(moviesType) {
    this.update({ moviesType, page: 1 })
  }

  onPageChange({ selected }) {
    this.update({ page: selected + 1 })
  }

  render() {
    const { moviesList, moviesGenres, history } = this.props;
    const { data, isLoading, error } = moviesList;

    const { moviesType } = qs.parse(history.location.search);

    return (
      <MoviesPage
        data_toolbar={{
          activeFilter: moviesType,
          handleFilter: this.handleFilter
        }}

        data_paging={{
          initialPage: (data.page - 1),
          pageCount: data.total_pages,
          onPageChange: this.onPageChange
        }}

        data_genresContext={{
          genres: moviesGenres.data,
          linkMovie: this.linkMovie
        }}

        data_moviesList={{
          movies: data.results,
          isLoading: isLoading,
          error: error
        }}
      />
    );
  }
};

MListContainer.propTypes = {
  actions: PT.shape({
    getMovies: PT.func.isRequired,
    getGenres: PT.func.isRequired,
  }).isRequired,

  moviesList: PT.shape({
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: PTS.nullOrNumber,
      total_results: PTS.nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired,

  moviesGenres: PT.shape({
    data: PT.array.isRequired
  }).isRequired,

  history: PT.shape({
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MListContainer);