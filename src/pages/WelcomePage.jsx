import { CardForWelcome } from "../components/CardForWelcome";
export function WelcomePage() {
	return (
		<>
			<div className="page-background"></div>
			<div className="card-wrapper">
				<CardForWelcome
					href="#/CheerfulCarnival"
					txtcolor="black"
					bgimg="cheerful-carnival"
					header="Cheerful Carnival"
					body={"Enter your teams for CC here"}
				/>
				<CardForWelcome
					href="#/Marathon"
					txtcolor="black"
					bgimg="marathon"
					header="Marathon"
					body={"Enter your teams for Marathon here"}
				/>

				<CardForWelcome
					href="#/Admin"
					txtcolor="black"
					bgimg="admin"
					header="Log In"
					body={"Managers log in here"}
				/>

				<CardForWelcome
					href="#/CreateAccount"
					txtcolor="black"
					bgimg="create-account"
					header="Create Account"
					body={"Create your manager account here"}
				/>

				<CardForWelcome
					href="#/UserHelp"
					txtcolor="black"
					bgimg="help"
					header="Help!"
					body={"Lots of FAQ's and guaidance for using StarDash"}
				/>
			</div>
		</>
	);
}
