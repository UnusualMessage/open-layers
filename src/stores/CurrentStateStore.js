import {makeAutoObservable} from "mobx";

import {
	geoJsonId,
	localStorageCenterLabel,
	localStorageFilterLabel,
	localStorageLayersLabel,
	localStorageZoomLabel, page
} from "../data/mapConfig";

class CurrentStateStore {
	constructor() {
		this.layersState = JSON.parse(localStorage.getItem(localStorageLayersLabel));
		if (this.layersState == null) {
			this.layersState = [];
		}

		this.currentCenter = JSON.parse(localStorage.getItem(localStorageCenterLabel));
		this.currentZoom = localStorage.getItem(localStorageZoomLabel);

		this.currentFilter = localStorage.getItem(localStorageFilterLabel);
		this.currentFilter = this.currentFilter ? this.currentFilter : "";

		this.currentTable = geoJsonId;

		this.currentPage = page;

		makeAutoObservable(this);
	}

	toNextPage = () => {
		this.currentPage += 1;
	}

	toPreviousPage = () => {
		this.currentPage -= 1;
	}

	toPage = (page) => {
		this.currentPage = page;
	}

	getCurrentPage = () => {
		return this.currentPage;
	}

	getFilter = () => {
		return this.currentFilter;
	}

	setFilter = (filter) => {
		this.currentFilter = filter;
		localStorage.setItem(localStorageFilterLabel, filter);
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

		localStorage.setItem(localStorageLayersLabel, JSON.stringify(this.layersState));
	}

	setCenter = (center) => {
		localStorage.setItem(localStorageCenterLabel, JSON.stringify(center));
		this.currentCenter = center;
	}

	setZoom = (zoom) => {
		localStorage.setItem(localStorageZoomLabel, zoom);
		this.currentZoom = zoom;
	}
}

export default new CurrentStateStore();