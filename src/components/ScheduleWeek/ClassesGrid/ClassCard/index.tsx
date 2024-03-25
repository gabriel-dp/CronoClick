import { Class } from "@/types/classes";

import { CardContainer } from "./styles";

interface ClassCardProps {
	class: Class;
}

export default function ClassCard(props: ClassCardProps) {
	return (
		<CardContainer $color={props.class.color}>
			<p className="title">{props.class.name}</p>
			<p className="teacher">{props.class.teacher}</p>
		</CardContainer>
	);
}
