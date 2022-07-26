/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/self-closing-comp */
import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (

      <div className="loaderDiv">
        <div
          aria-busy="true"
          className="loading loadingLarge bgDark"
          title="Loading"
          id="loader"
        >
        </div>
      </div>
    );
  }
}
