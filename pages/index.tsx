import { useState, useEffect } from "react";
import Head from "next/head"
import axios from "axios";
import LoginForm from "../components/loginForm";

export default function Home() {
	const [token, setToken] = useState<string>(null);
	const [user, setUser] = useState<{ name: string; email: string }>(null);
	const [error, setError] = useState<{ name: string; message: string }>(null);
	const [loading, setLoading] = useState(false);
	useState<{ email: string; password: string }>(null);

  const login = async (email: string, password: string) => {
    const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !password) {
			setError({
				name: "Invalid Input",
				message: "Email or Password cannot be empty!"
			});
			return;
    }
    
    if (!re.test(email)) {
      setError({
        name: "Inavlid Email",
        message: "Please enter a valid email."
      })
      return
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
		<>
			<Head>
				<title>TAM Creates | Login</title>
			</Head>
			<div className="flex flex-col justify-center items-center h-screen bg-gray-200">
				<div className="bg-yellow-300 px-6 py-4 rounded-xl text-center hover:shadow-xl cursor-default">
					<h1 className="text-gray-700 font-extrabold text-2xl">
						Welcome to TAM creates
					</h1>
					<h1 className="mt-2 text-gray-700 font-bold">
						Please login to continue
					</h1>
				</div>
				<div className="rounded-xl p-10 bg-gray-50 mt-12 hover:shadow-2xl">
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
					{!token && !user && !loading ? (
						<LoginForm login={login} />
					) : (
						""
					)}
					<div className="flex justify-center items-center h-10 mt-2">
						{error ? (
							<h1 className="py-2 px-4 bg-red-200 text-red-600 rounded-xl inline-block">
								{" "}
								{error.message}{" "}
							</h1>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
  );
}
