import {observer} from "mobx-react-lite";

import css from "./switcher.module.scss";

import LayerSwitcher from "./LayerSwitcher";

const Switcher = () => {
	return(
		<div className={`${css.switcher}`}>
			<LayerSwitcher label={"geojson"} text={"Слой GeoJSON"} layerId={"geo"} />
			<LayerSwitcher label={"csv"} text={"Слой CSV"} layerId={"csv"} />
		</div>
	)
}

export default observer(Switcher);