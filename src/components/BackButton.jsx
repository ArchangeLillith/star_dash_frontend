import React from "react";
export function BackButton() {
	const [backArrow, setBackArrow] = React.useState({
		src: `../img/back-arrow-base.png`,
	});
	return (
		<div className="back-button-wrapper">
			<a href="/">
				<img
					className="back-img"
					src={backArrow.src}
					id="back-img"
					alt="back arrow"
					onMouseEnter={() => {
						setBackArrow({
							src: `../img/back-arrow-hover.png`,
						});
					}}
					onMouseOut={() => {
						setBackArrow({
							src: `../img/back-arrow-base.png`,
						});
					}}
				/>
			</a>
		</div>
	);
}
