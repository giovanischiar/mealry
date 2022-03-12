import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { Action } from '../app/interfaces';
import { loadMeals, selectMeal } from '../app/actions';
import { State } from '../app/interfaces';
import { Meals } from './Meals';

const mapStateToProps = (state: State) => (
	{
		dayMeals : state.dayMeals
	}
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
	loadMeals,
	selectMeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
