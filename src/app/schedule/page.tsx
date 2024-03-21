import { Class, DayClasses } from "@/types/schedule";
import Schedule from "@/components/Schedule";

const week: DayClasses[] = [
	{
		day: "SEG",
		items: [
			{
				start: 10 * 60,
				end: 12 * 60,
				name: "Teoria de Linguagens",
				teachers: ["Vinícius Durelli"]
			} as Class,
			{
				start: 13 * 60,
				end: 15 * 60,
				name: "Computação Gráfica",
				teachers: ["???"]
			} as Class
		]
	},
	{
		day: "TER",
		items: [
			{
				start: 8 * 60,
				end: 10 * 60,
				name: "Tecnologias Web",
				teachers: ["Matheus Viana"]
			} as Class,
			{
				start: 10 * 60,
				end: 12 * 60,
				name: "Pesquisa Operacional",
				teachers: ["Guilherme Pena"]
			} as Class,
			{
				start: 13 * 60,
				end: 15 * 60,
				name: "Inteligência Artificial",
				teachers: ["Edimilson Batista"]
			} as Class,
			{
				start: 15 * 60,
				end: 17 * 60,
				name: "Engenharia de Software",
				teachers: ["Elisa Tuler"]
			} as Class
		]
	},
	{
		day: "QUA",
		items: [
			{
				start: 10 * 60,
				end: 12 * 60,
				name: "Teoria de Linguagens",
				teachers: ["Vinícius Durelli"]
			} as Class,
			{
				start: 13 * 60,
				end: 15 * 60,
				name: "Computação Gráfica",
				teachers: ["???"]
			} as Class
		]
	},
	{
		day: "QUI",
		items: [
			{
				start: 8 * 60,
				end: 10 * 60,
				name: "Tecnologias Web",
				teachers: ["Matheus Viana"]
			} as Class,
			{
				start: 10 * 60,
				end: 12 * 60,
				name: "Pesquisa Operacional",
				teachers: ["Guilherme Pena"]
			} as Class,
			{
				start: 13 * 60,
				end: 15 * 60,
				name: "Inteligência Artificial",
				teachers: ["Edimilson Batista"]
			} as Class,
			{
				start: 15 * 60,
				end: 17 * 60,
				name: "Engenharia de Software",
				teachers: ["Elisa Tuler"]
			} as Class
		]
	},
	{
		day: "SEX",
		items: []
	}
];

export default function SchedulePage() {
	return (
		<>
			<Schedule week={week} />
		</>
	);
}
