import { useEffect, useState } from "react";

const userApiUrl = "https://jsonplaceholder.typicode.com/users";

export function useFetchUser(userId) {
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const controller = new AbortController();
		setLoading(true);
		fetch(`${userApiUrl}/${userId}`, { signal: controller.signal })
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
				setError(undefined);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			});
		return () => {
			controller.abort();
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		};
	}, [userId]);

	return { user: userData, loading, error };
}
