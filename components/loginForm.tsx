import { ChangeEvent, useState } from "react";

const LoginForm = ({ login }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.type) {
			case "text":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
		}
	};

	return (
		<form className="flex flex-col justify-evenly items-center p-4">
			<div>
				<input
					className="mt-4 px-2 py-1 border-gray-200 hover:border-gray-400 focus:border-gray-900 border-2 rounded-lg outline-none text-gray-900"
					type="text"
					placeholder="Email"
					value={email}
					onChange={updateValue}
				/>
			</div>

			<div>
				<input
					className="mt-4 px-2 py-1 border-gray-200 hover:border-gray-400 focus:border-gray-900 border-2 rounded-lg outline-none text-gray-900"
					type="password"
					placeholder="Password"
					value={password}
					onChange={updateValue}
				/>
			</div>
			<div className="mt-4">
				<button
					className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white outline-none focus:outline-none"
					type="reset"
				>
					Reset
				</button>
				<button
					className="px-4 py-1 bg-green-600 rounded-lg text-white ml-12 outline-none focus:outline-none hover:bg-green-700"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						login(email, password);
						setEmail("");
						setPassword("");
					}}
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
