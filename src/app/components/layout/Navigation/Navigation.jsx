import './Navigation.scss';

import React from 'react';
import cn from 'classnames';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import history, { redirect } from 'app_history';
import {
  NavToggle,
  LocaleDropdown,
  SearchForm
} from 'app_components/layout/Navigation/_blocks/';

const Navigation = () => {
  const cls_base = 'movies-navbar';

  const goHome = (e) => {
    e.preventDefault();
    const { lng } = qs.parse(history.location.search);

    redirect(`/?${qs.stringify({ lng })}`);
  }

  return (
    <nav className={cn(cls_base, 'navbar navbar-expand-sm navbar-dark')}>
      <div className="container p-0">
        <a
          href="/"
          className="link-home"
          onClick={(e) => goHome(e)}
        >
          <FontAwesomeIcon
            className="mr-1"
            icon={faFilm} />
              Movies
          </a>

        <NavToggle>
          <SearchForm />
          <LocaleDropdown />
        </NavToggle>

      </div>
    </nav>
  );
}

export default Navigation;