import css from "./controls.module.scss";

import Switcher from "./Switcher";
import TableSwitcher from "./TableSwitcher";
import Filter from "./Filter";
import Paginator from "./Paginator/Paginator";
import PresentationButton from "./PresentationButton";

const Controls = () => {
	return(
		<div className={`${css.controls}`}>
			<Switcher/>
			<TableSwitcher/>
			<Filter/>
			<Paginator/>
			<PresentationButton/>
		</div>
	)
}

export default Controls;