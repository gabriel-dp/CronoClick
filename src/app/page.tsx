import { useSession } from "@/contexts/session/useSession";
import Button from "@/components/ui/Button";

export default async function Home() {
	const session = await useSession();

	return (
		<main>
			<h1>TecWeb</h1>
			{session && (
				<>
					<p>{JSON.stringify(session)}</p>
					<Button />
				</>
			)}
		</main>
	);
}
