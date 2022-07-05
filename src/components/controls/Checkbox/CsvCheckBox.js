import {runInAction} from "mobx";
import {useState} from "react";

import MapStore from "../../../stores/MapStore";

const CsvCheckBox = () => {
	const [visible, setVisible] = useState(true);

	const onChange = (e) => {
		runInAction(() => {
			MapStore.changeLayerVisibility(!visible, MapStore.getLayers()[1]);
			setVisible(!visible);
		})
	}

	return(
		<div>
			<label htmlFor={"csv-check"}>Показать Csv</label>
			<input type={"checkbox"} id={"csv-check"} onChange={onChange} checked={visible}/>
		</div>
	)
}

export default CsvCheckBox;