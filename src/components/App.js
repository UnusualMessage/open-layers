import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import Switcher from "./controls/Checkbox";
import ObjectsTable from "./ObjectsTable";
import Layer from "./Layer";
import fromTextToJson from "../utils/Parser/fromTextToJson";
import fromCsvToJson from "../utils/Parser/fromCsvToJson";
import fromJsonToGeoJson from "../utils/Parser/fromJsonToGeoJson";

function App() {
	return (
		<>
			<Switcher/>
			<MultiLayerMap>
				<Layer strategies={[fromTextToJson]} sourceUrl={'bars.geojson'} layerId={"geo"}/>
				<Layer strategies={[fromCsvToJson, fromJsonToGeoJson]} sourceUrl={'portals.csv'} layerId={"csv"}/>
			</MultiLayerMap>
			<ObjectsTable/>
		</>
	);
}

export default observer(App);
