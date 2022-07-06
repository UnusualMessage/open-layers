import {observer} from "mobx-react-lite";

import css from "./switcher.module.scss";

import LayerSwitcher from "./LayerSwitcher";
import {geoJsonId, csvId} from "../../../data/mapConfig";

const Switcher = () => {
	return(
		<div className={`${css.switcher}`}>
			<LayerSwitcher label={"geojson"} text={"Слой GeoJSON"} layerId={geoJsonId} />
			<LayerSwitcher label={"csv"} text={"Слой CSV"} layerId={csvId} />
		</div>
	)
}

export default observer(Switcher);