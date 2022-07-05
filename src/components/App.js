import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import GeoJsonLayer from "./Layer";
import CsvLayer from "./Layer/CsvLayer";

import './App.module.scss';

function App() {
	return (
		<>
			<MultiLayerMap>
				<GeoJsonLayer/>
				<CsvLayer/>
			</MultiLayerMap>
		</>
	);
}

export default observer(App);
