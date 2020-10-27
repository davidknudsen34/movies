import './RatingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { withTranslation } from 'react-i18next';

function RatingBlock({ t, cls, data }) {
  const { vote_average, vote_count } = data;
  const b = b_.with(cls);

  if (!vote_average) return null;

  return (
    <div className={b()}>
      <div>
        <FontAwesomeIcon
          className={b('icon')}
          icon={faStar}
        />
        {vote_average}
        <span className={b('scale')}>
          /10
        </span>
      </div>

      {vote_count
        ? (
          <div className={b('votes')}>
            <span className="mr-1">
              {vote_count}
            </span>
            <span>
              {t('movie_details.votes', { count: vote_count })}
            </span>
          </div>
          )
        : ''}
    </div>
  );
};

RatingBlock.propTypes = {
  t: PT.func.isRequired,
  cls: PT.string.isRequired,

  data: PT.shape({
    vote_average: PT.number,
    vote_count: PT.number
  }).isRequired
};

export default withTranslation()(RatingBlock);