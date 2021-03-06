import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import VectorLayer from "ol/layer/Vector";

import ObjectsStore from "../../stores/ObjectsStore";
import styleFunction from "../../utils/styleFunction";
import MapStore from "../../stores/MapStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import {defaultVisibility} from "../../data/mapConfig";

const Layer = ({ sourceUrl, strategies, layerId }) => {
	runInAction(async () => {
		await ObjectsStore.readGroup(
			sourceUrl,
			strategies,
			layerId
		);

		const group = ObjectsStore.getFeaturesById(layerId, CurrentStateStore.getFilter());

		const geoJson = {
			type: "FeatureCollection",
			features: group.featureCollection
		}

		const vectorSource = new VectorSource({
			features: new GeoJSON().readFeatures(geoJson)
		});

		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: styleFunction
		});

		let visible = CurrentStateStore.getLayerStateById(layerId);

		if (visible === undefined || visible == null) {
			visible = defaultVisibility;
		}

		vectorLayer.setVisible(visible);
		CurrentStateStore.addLayerState(visible, layerId);

		MapStore.addLayer(vectorLayer, layerId);
		MapStore.setOnClick(vectorLayer);
	});

	return(
		<>
		</>
	);
}

export default observer(Layer);