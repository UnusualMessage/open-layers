import {makeAutoObservable} from "mobx";

class CurrentStateStore {
	constructor() {
		this.layersState = JSON.parse(localStorage.getItem("layers"));
		if (this.layersState == null) {
			this.layersState = [];
		}

		this.currentCenter = localStorage.getItem("center");
		this.currentCenter = this.fromStringToArray(this.currentCenter, Number);

		this.currentZoom = localStorage.getItem("zoom");

		this.filter = localStorage.getItem("filter");
		this.filter = this.filter ? this.filter : "";

		this.currentTable = "geo";

		makeAutoObservable(this);
	}

	fromStringToArray = (str, strategy) => {
		if (str != null) {
			str = str.split(',');
			str = str.map(item => strategy(item));
			return str;
		}

		return null;
	}

	getFilter = () => {
		return this.filter;
	}

	setFilter = (filter) => {
		this.filter = filter;
		localStorage.setItem("filter", filter);
	}

	setCurrentTable = (table) => {
		this.currentTable = table;
	}

	getCurrentTable = () => {
		return this.currentTable;
	}

	getCenter = () => {
		return this.currentCenter;
	}

	getZoom = () => {
		return this.currentZoom;
	}

	getLayerStateById = (id) => {
		return this.layersState?.find(state => state.id === id)?.visible;
	}

	addLayerState = (visible, id) => {
		const layersState = this.layersState?.find(state => state.id === id);

		if (layersState != null) {
			layersState.visible = visible;
		} else {
			this.layersState.push({
				visible: visible,
				id: id
			})
		}

		localStorage.setItem("layers", JSON.stringify(this.layersState));
	}

	setCenter = (center) => {
		localStorage.setItem("center", center);
		this.currentCenter = center;
	}

	setZoom = (zoom) => {
		localStorage.setItem("zoom", zoom);
		this.currentZoom = zoom;
	}
}

export default new CurrentStateStore();