import {makeAutoObservable} from "mobx";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

class MapStore {
	map = null;

	constructor() {
		makeAutoObservable(this);
	}

	initMap = (ref, center, zoom) => {
		this.map = new Map({
			layers: [new TileLayer({
				source: new OSM()
			})],

			target: ref,
			view: new View({
				center: center,
				zoom: zoom
			})
		});
	}

	getMap = () => {
		return this.map;
	}
}

export default new MapStore();