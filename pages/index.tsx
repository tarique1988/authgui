import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import LoginForm from "../components/loginForm";

export default function Home() {
	const [token, setToken] = useState<string>(null);
	const [user, setUser] = useState<{ name: string; email: string }>(null);
	const [error, setError] = useState<{ name: string; message: string }>(null);
	const [loading, setLoading] = useState(false);
	useState<{ email: string; password: string }>(null);

	const login = async (email: string, password: string) => {
		if (!email || !password) {
			setError({
				name: "Credential Error",
				message: "Email or Password cannot be empty!"
			});
			return;
		}
		setLoading(true);
		return axios
			.post("/api/auth", {
				email: email,
				password: password
			})
			.then((response) => {
				if (response.data.success && response.data.success == true)
					setToken(response.data.data.token);
				else {
					setError(response.data.errors[0]);
				}
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (token)
			axios
				.get("/api/whoami", {
					headers: {
						Authorization: token
					}
				})
				.then((res) => {
					setUser({
						name: res.data.data.user.name,
						email: res.data.data.user.email
					});
				})
				.catch((err) => {
					setError({
						name: err.name as unknown as string,
						message: err.message as unknown as string
					});
					console.log(err);
				});
	}, [token]);

	useEffect(() => {
		if (error)
			setTimeout(() => {
				setError(null);
			}, 5000);
	}, [error]);

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="shadow-xl p-10 rounded-xl">
				{loading ? <h1 className="text-lg">Loading.</h1> : ""}
				{token && !user ? (
					<h1>Received token, identifying user...</h1>
				) : (
					""
				)}
				{user ? (
					<div className="flex flex-col justify-center items-center">
						<h1>
							Logged in as{" "}
							<span className="text-2xl font-bold text-blue-800">
								{user.name}
							</span>
						</h1>
						<button
							onClick={() => {
								setUser(null);
								setToken(null);
								setError(null);
							}}
							className="rounded-xl px-4 py-2 bg-red-500 text-white mt-5 hover:bg-red-600 focus:outline-none"
						>
							Logout
						</button>
					</div>
				) : (
					""
				)}
				{!token && !user && !loading ? <LoginForm login={login} /> : ""}
				{error ? (
					<h1 className="absolute py-1 px-4 bg-red-700 text-white rounded-xl inline-block">
						{" "}
						{error.message}{" "}
					</h1>
				) : (
					""
				)}
			</div>
		</div>
	);
}
