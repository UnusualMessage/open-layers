import {Icon, Style} from "ol/style";

const image = new Icon({
	anchor: [0.5, 46],
	anchorXUnits: 'fraction',
	anchorYUnits: 'pixels',
	src: 'icon.png',
});

const styles = {
	Point: new Style({
		image: image
	}),
};

const styleFunction = function (feature) {
	return styles[feature.getGeometry().getType()];
};

export default styleFunction;