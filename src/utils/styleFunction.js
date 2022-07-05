import CircleStyle from "ol/style/Circle";
import {Fill, Stroke, Style} from "ol/style";

const image = new CircleStyle({
	radius: 10,
	fill: new Fill({color: "red"}),
	stroke: new Stroke({ color: "red", width: 2 })
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