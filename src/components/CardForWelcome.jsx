export function CardForWelcome(props) {
	function classes() {
		const bg = props.bgimg ? props.bgimg : " ";
		const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
		return "welcome-card-section " + bg + txt;
	}
	function href() {
		const href = props.href ? props.href : "";
		return href;
	}

	return (
		<section className={classes()} style={{ maxWidth: "35rem" }}>
			<a href={href()}>
				<div className="global-header">{props.header}</div>
				<div className="card-body">
					{props.title && <h5 className="card-title">{props.title}</h5>}
					{props.text && <p className="card-text">{props.text}</p>}
					{props.body}
					{props.status && <div id="createStatus">{props.status}</div>}
				</div>
			</a>
		</section>
	);
}
