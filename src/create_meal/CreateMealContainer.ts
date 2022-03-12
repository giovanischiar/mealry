import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { addMeal } from '../app/actions';
import { State } from '../app/interfaces';
import { CreateMeal } from './CreateMeal';

const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
	addMeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeal);
