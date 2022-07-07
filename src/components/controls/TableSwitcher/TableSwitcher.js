import {observer} from "mobx-react-lite";

import css from "./tableSwitcher.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";
import {geoJsonId, csvId} from "../../../data/mapConfig";

const TableSwitcher = () => {
	const onChange = (e) => {
		CurrentStateStore.setCurrentTable(e.target.value);
	}

	return(
		<div className={`${css.switcher}`}>
			<div className={`${css.button}`}>
				<input type="radio" value="geo" id="geoTable" onChange={onChange}
				       checked={CurrentStateStore.getCurrentTable() === geoJsonId}/>

				<label htmlFor="geoTable">GeoJSON таблица</label>
			</div>

			<div className={`${css.button}`}>
				<input type="radio" value="csv" id="csvTable" onChange={onChange}
				       checked={CurrentStateStore.getCurrentTable() === csvId}/>

				<label htmlFor="csvTable">CSV таблица</label>
			</div>
		</div>
	);
}

export default observer(TableSwitcher);