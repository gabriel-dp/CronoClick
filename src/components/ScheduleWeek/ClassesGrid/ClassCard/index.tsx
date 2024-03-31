import { Class } from "@/types/classes";

import { CardContainer } from "./styles";

interface ClassCardProps {
	class: Class;
	onClick?: () => void;
}

export default function ClassCard(props: ClassCardProps) {
	return (
		<CardContainer
			$color={props.class.subject.color}
			onClick={props.onClick}
		>
			<p className="title">{props.class.subject.name}</p>
			<p className="teacher">{props.class.subject.teacher}</p>
		</CardContainer>
	);
}
