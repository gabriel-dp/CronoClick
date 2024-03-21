import { Class } from "@/types/schedule";

import { CardContainer } from "./styles";

interface ClassCardProps {
	class: Class;
}

export default function ClassCard(props: ClassCardProps) {
	const teachers: string = props.class.teachers?.join(", ");

	return (
		<CardContainer>
			<p className="title">{props.class.name}</p>
			<p className="teachers">{teachers}</p>
		</CardContainer>
	);
}
