import React from 'react';
import { RenderRoutes } from 'src/routes';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <RenderRoutes routes={this.props.route.routes}/>
      </div>
    );
  }
}

export default connect()(withRouter(App));