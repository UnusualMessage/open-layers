import {runInAction} from "mobx";

import css from "./filter.module.scss";
import ObjectsStore from "../../../stores/ObjectsStore";

const Filter = () => {
	const onInput = (e) => {
		runInAction(() => {
			ObjectsStore.setFilter(e.target.value);
		})
	}

	return(
		<div className={`${css.filter}`}>
			<label htmlFor={"filter"}>Поиск</label>
			<input id={"filter"} placeholder={"name"} onInput={onInput}/>
		</div>
	)
}

export default Filter;