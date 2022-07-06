import {observer} from "mobx-react-lite";

import css from "./button.module.scss";
import MapStore from "../../../stores/MapStore";
import {csvId, geoJsonId} from "../../../data/mapConfig";

const PresentationButton = () => {
	const onClick = () => {
		MapStore.startTours([geoJsonId, csvId]);
	}

	return(
		<button className={`${css.button}`} onClick={onClick}>
			Презентация
		</button>
	);
}

export default observer(PresentationButton);