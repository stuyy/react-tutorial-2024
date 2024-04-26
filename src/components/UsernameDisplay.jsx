import { useEffect, useState } from "react";

export function UsernameDisplay({ username }) {
	const [timerPassed, setTimerPassed] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setTimerPassed(true);
		}, 1500);
	}, []);

	return (
		<div>
			<span>{timerPassed && username}</span>
		</div>
	);
}
