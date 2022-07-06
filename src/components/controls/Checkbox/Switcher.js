import {observer} from "mobx-react-lite";

import css from "./switcher.module.scss";

import LayerSwitcher from "./LayerSwitcher";

const Switcher = () => {
	return(
		<div className={`${css.switcher}`}>
			<LayerSwitcher label={"geojson"} text={"Слой GeoJSON"} layerId={0} />
			<LayerSwitcher label={"csv"} text={"Слой CSV"} layerId={1} />
		</div>
	)
}

export default observer(Switcher);