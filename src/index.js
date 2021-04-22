import { Switch } from "react-router-dom";
import Route from './components/route';
import PropTypes from 'prop-types';

function AugmentRouter({ routes }) {
    return (
        <Switch>
            { routes.map( ( r, i ) => <Route exact={ i === 0 } path={r.path} component={r.component} check={r.check} redirect={r.redirect} /> ) }
        </Switch>
    );
}

AugmentRouter.propTypes = {
    routes: PropTypes.array.isRequired
};

export default AugmentRouter;
