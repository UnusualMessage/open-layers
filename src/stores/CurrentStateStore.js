class CurrentStateStore {
	constructor() {
		this.currentCenter = localStorage.getItem("center");

		if (this.currentCenter != null) {
			this.currentCenter = this.currentCenter.split(',');
			this.currentCenter = this.currentCenter.map(coordinate => Number(coordinate));
		}

		this.currentZoom = localStorage.getItem("zoom");
	}

	getCenter = () => {
		return this.currentCenter;
	}

	getZoom = () => {
		return this.currentZoom;
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