import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { Action } from '../app/interfaces';
import { loadMeals } from '../app/actions';
import { State } from '../app/interfaces';
import { Meals } from './Meals';

const mapStateToProps = (state: State) => (
	{
		meals : state.meals
	}
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
	loadMeals
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
