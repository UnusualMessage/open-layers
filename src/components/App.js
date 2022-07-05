import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import GeoJsonLayer from "./Layer";
import CsvLayer from "./Layer/CsvLayer";
import LayerSwitcher from "./controls/Checkbox/LayerSwitcher";
import MapStore from "../stores/MapStore";

import css from './App.module.scss';

function App() {
	return (
		<>
			<div className={`${css.switcher}`}>
				<LayerSwitcher label={"geojson"} text={"Слой GeoJSON"} layer={MapStore.getLayers()[0]}/>
				<LayerSwitcher label={"csv"} text={"Слой CSV"} layer={MapStore.getLayers()[1]}/>
			</div>
			<MultiLayerMap>
				<GeoJsonLayer/>
				<CsvLayer/>
			</MultiLayerMap>
		</>
	);
}

export default observer(App);
