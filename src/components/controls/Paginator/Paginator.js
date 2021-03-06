import {observer} from "mobx-react-lite";

import css from "./paginator.module.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";
import ObjectsStore from "../../../stores/ObjectsStore";
import {pageSize} from "../../../data/mapConfig";

const Paginator = () => {
	let pagesCount = Math.ceil(ObjectsStore.getCurrentFeaturesCount(
		CurrentStateStore.getCurrentTable(),
		CurrentStateStore.getFilter()
	) / pageSize);

	const tableVisible = CurrentStateStore.getLayerStateById(CurrentStateStore.getCurrentTable());
	if (pagesCount === 0 || isNaN(pagesCount) || tableVisible === false) {
		pagesCount = 1;
	}

	const currentPage = CurrentStateStore.getCurrentPage();

	const onNext = () => {
		if (currentPage !== pagesCount) {
			CurrentStateStore.toNextPage();
		}
	}

	const onLast = () => {
		CurrentStateStore.toPage(pagesCount);
	}

	const onInput = (e) => {
		let page = e.target.value;

		CurrentStateStore.toPage(Number(page));
	}

	const onPrevious = () => {
		if (currentPage > 1) {
			CurrentStateStore.toPreviousPage();
		}
	}

	const onFirst = () => {
		CurrentStateStore.toPage(1);
	}

	return(
		<div className={`${css.paginator}`}>
			<button onClick={onFirst}>
				{"<<"}
			</button>

			<button onClick={onPrevious}>
				{"<"}
			</button>

			<input className={`${css.input}`}
			       type="number"
			       onInput={onInput}
			       value={currentPage === 0 ? "" : currentPage} min={1} max={pagesCount}/>

			<span>
				из {pagesCount}
			</span>

			<button onClick={onNext}>
				{">"}
			</button>

			<button onClick={onLast}>
				{">>"}
			</button>
		</div>
	)
}

export default observer(Paginator);