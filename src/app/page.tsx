import { useSession } from "@/contexts/session/useSession";
import { logout } from "@/utils/authActions";
import { redirectSignIn } from "@/utils/redirects";
import Button from "@/components/ui/Button";

export default async function Home() {
	const session = await useSession();

	return (
		<main>
			<h1>TecWeb</h1>
			{session ? (
				<>
					<p>{JSON.stringify(session)}</p>
					<Button onClick={logout} text="logout" />
				</>
			) : (
				<>
					<Button onClick={redirectSignIn} text="login" />
				</>
			)}
		</main>
	);
}
