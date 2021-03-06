import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import Layer from "./Layer";
import fromTextToJson from "../utils/Parser/fromTextToJson";
import fromCsvToJson from "../utils/Parser/fromCsvToJson";
import fromJsonToGeoJson from "../utils/Parser/fromJsonToGeoJson";
import {geoJsonId, csvId, geoJsonUrl, csvUrl} from "../data/mapConfig";
import Controls from "./controls";
import FeatureOverlay from "./Overlay/FeatureOverlay";
import FeaturesTable from "./FeaturesTable";

function App() {
	return (
		<>
			<Controls/>
			<MultiLayerMap>
				<Layer strategies={[fromTextToJson]} sourceUrl={geoJsonUrl} layerId={geoJsonId}/>
				<Layer strategies={[fromCsvToJson, fromJsonToGeoJson]} sourceUrl={csvUrl} layerId={csvId}/>
			</MultiLayerMap>
			<FeatureOverlay/>
			<FeaturesTable/>
		</>
	);
}

export default observer(App);
