import "./index.css";
import * as React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import { WelcomePage } from "./pages/WelcomePage";
import { CheerfulCarnival } from "./pages/CheerfulCarnival";
import { Marathon } from "./pages/Marathon";
import { Admin } from "./pages/Admin";
import { Teams } from "./pages/Teams";
import { Schedule } from "./pages/Schedule";
import { CreateRun } from "./pages/CreateRun";
import { UserContext, GlobalContext } from "./context.jsx";
import { DisplayAllData } from "./pages/DisplayAllData";
import { PageNotFound } from "./pages/PageNotFound";
import { UserHelp } from "./pages/UserHelp";
import { CreateAdminAccount } from "./pages/CreateAdminAccount";
import { Managers } from "./pages/Managers";
import { JoinRun } from "./pages/JoinRun";

function App() {
	const [user, setUser] = React.useState({
		user: "",
		loggedIn: false,
		scheduleArray: [],
		runner: [{}],
		character: "",
		registeredEvents: [],
		associatedUsers: [],
		leadManager: "",
		activeTeamDropdown: Array(200).fill(false),
	});
	const [globalContext, setGlobalContext] = React.useState({
		allEvents: [],
	});

	return (
		<HashRouter>
			<GlobalContext.Provider value={{ globalContext, setGlobalContext }}>
				<UserContext.Provider value={{ user, setUser }}>
					<NavBar />
					<Routes>
						<Route path="/" exact element={<WelcomePage />} />
						<Route path="/Schedule/" element={<Schedule />} />
						<Route path="/Teams/" element={<Teams />} />
						<Route path="/CheerfulCarnival/" element={<CheerfulCarnival />} />
						<Route path="/Marathon/" element={<Marathon />} />
						<Route path="/Admin/" element={<Admin />} />
						<Route path="/UserData/" element={<DisplayAllData />} />
						<Route path="/CreateRun/" element={<CreateRun />} />
						<Route path="/UserHelp/" element={<UserHelp />} />
						<Route path="/CreateAccount" element={<CreateAdminAccount />} />
						<Route path="/Managers" element={<Managers />} />
						<Route path="/JoinRun" element={<JoinRun />} />
						<Route path="/*" element={<PageNotFound />} />
					</Routes>
				</UserContext.Provider>
			</GlobalContext.Provider>
		</HashRouter>
	);
}

export default App;
