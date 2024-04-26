import { Suspense, useEffect, useState } from "react";
import { PostContainer } from "./components/PostContainer";
import { UserDetails } from "./components/UserDetails";
import { UserContext } from "./utils/contexts/UserContext";
import { useFetchUser } from "./utils/hooks/useFetchUser";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { TestInputField } from "./components/TestInputField";

export default function App({ usersData }) {
	const { user, loading, error } = useFetchUser(2);
	const [userData, setUserData] = useState();
	// const navigate = useNavigate();

	const [users, setUsers] = useState(usersData);

	useEffect(() => {
		if (!loading && !error && user) {
			setUserData(user);
		}
	}, [loading, error, user]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<TestInputField />
			{users.map((user) => (
				<UserDetails key={user.id} user={user} setUsers={setUsers} />
			))}
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/users">Users</Link>
					</li>
					<li>
						<Link to="/blog-posts">Blogs</Link>
					</li>
				</ul>
			</nav>
			{/* <div>
				<label htmlFor="data">Enter Data</label>
				<input
					type="text"
					id="data"
					onChange={(e) => {
						if (e.target.value.length > 10) {
							navigate("/blog-posts", {
								state: {
									posts: [
										{
											id: 1,
											title: "hello world",
											content: "welcome to my first post",
										},
									],
								},
							});
						}
					}}
				/>
			</div> */}

			<UserContext.Provider value={{ ...userData, setUserData }}>
				<PostContainer />
			</UserContext.Provider>
			<Outlet />
		</Suspense>
	);
}
