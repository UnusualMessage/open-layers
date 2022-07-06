import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import Switcher from "./controls/Checkbox";
import ObjectsTable from "./ObjectsTable";
import Layer from "./Layer";
import fromTextToJson from "../utils/Parser/fromTextToJson";
import fromCsvToJson from "../utils/Parser/fromCsvToJson";
import fromJsonToGeoJson from "../utils/Parser/fromJsonToGeoJson";
import {geoJsonId, csvId, geoJsonUrl, csvUrl} from "../data/mapConfig";

function App() {
	return (
		<>
			<Switcher/>
			<MultiLayerMap>
				<Layer strategies={[fromTextToJson]} sourceUrl={geoJsonUrl} layerId={geoJsonId}/>
				<Layer strategies={[fromCsvToJson, fromJsonToGeoJson]} sourceUrl={csvUrl} layerId={csvId}/>
			</MultiLayerMap>
			<ObjectsTable/>
		</>
	);
}

export default observer(App);
