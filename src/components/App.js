import {observer} from "mobx-react-lite";

import MultiLayerMap from "./MultiLayerMap";
import Switcher from "./controls/Checkbox";
import Layer from "./Layer";
import fromTextToJson from "../utils/Parser/fromTextToJson";
import fromCsvToJson from "../utils/Parser/fromCsvToJson";
import fromJsonToGeoJson from "../utils/Parser/fromJsonToGeoJson";
import {geoJsonId, csvId, geoJsonUrl, csvUrl} from "../data/mapConfig";
import Controls from "./controls";
import PresentationButton from "./controls/PresentationButton";
import FeatureOverlay from "./Overlay/FeatureOverlay";
import Filter from "./controls/Filter";
import FeaturesTable from "./FeaturesTable";
import TableSwitcher from "./controls/TableSwitcher";
import Paginator from "./controls/Paginator/Paginator";

function App() {
	return (
		<>
			<Controls>
				<Switcher/>
				<TableSwitcher/>
				<Filter/>
				<Paginator/>
				<PresentationButton/>
			</Controls>
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
