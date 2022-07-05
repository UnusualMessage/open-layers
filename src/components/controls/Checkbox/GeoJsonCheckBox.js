import {useState} from "react";
import {runInAction} from "mobx";

import MapStore from "../../../stores/MapStore";

const GeoJsonCheckBox = () => {
	const [visible, setVisible] = useState(true);

	const onChange = (e) => {
		runInAction(() => {
			MapStore.changeLayerVisibility(!visible, MapStore.getLayers()[0]);
			setVisible(!visible);
		})
	}

	return(
		<div>
			<label htmlFor={"geo-check"}>Показать GeoJson</label>
			<input type={"checkbox"} id={"geo-check"} checked={visible} onChange={onChange}/>
		</div>
	)
}

export default GeoJsonCheckBox;