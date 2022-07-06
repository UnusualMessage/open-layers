import css from "./controls.module.scss";

const Controls = ({children}) => {
	return(
		<div className={`${css.controls}`}>
			{children}
		</div>
	)
}

export default Controls;