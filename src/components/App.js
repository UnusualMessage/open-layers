import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import GeoJsonLayer from "./Layer";
import CsvLayer from "./Layer/CsvLayer";

import './App.module.scss';
import ObjectsTable from "./ObjectsTable";
import GeoJsonCheckBox from "./controls/Checkbox/GeoJsonCheckBox";
import CsvCheckBox from "./controls/Checkbox/CsvCheckBox";

function App() {
	return (
		<>
			<div>
				<GeoJsonCheckBox/>
				<CsvCheckBox/>
			</div>
			<MultiLayerMap>
				<GeoJsonLayer/>
				<CsvLayer/>
			</MultiLayerMap>
		</>
	);
}

export default observer(App);
