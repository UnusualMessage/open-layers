import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

import css from "./filter.module.scss";
import CurrentStateStore from "../../../stores/CurrentStateStore";
import MapStore from "../../../stores/MapStore";

const Filter = () => {
	const onInput = (e) => {
		runInAction(() => {
			CurrentStateStore.setFilter(e.target.value);
			MapStore.filterFeatures(CurrentStateStore.getFilter());
		})
	}

	return(
		<div className={`${css.filter}`}>
			<label htmlFor={"filter"}>Поиск</label>
			<input id={"filter"} placeholder={"name"} onInput={onInput} value={CurrentStateStore.getFilter()}/>
		</div>
	)
}

export default observer(Filter);