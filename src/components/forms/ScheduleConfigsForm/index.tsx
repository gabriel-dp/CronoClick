import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Configs } from "@/types/configs";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { FormContainer } from "@/components/forms/styles";

import { configsSchema, ConfigsSchema } from "./types";

interface ScheduleConfigsFormProps {
	initialConfigs: Configs;
	setConfigs: (newConfigs: Configs) => void;
	finally: () => void;
}

export default function ScheduleConfigsForm(props: ScheduleConfigsFormProps) {
	const { register, handleSubmit, reset } = useForm<ConfigsSchema>({
		resolver: zodResolver(configsSchema)
	});

	// Set initial values
	useEffect(() => {
		reset(props.initialConfigs);
	}, [reset, props.initialConfigs]);

	function handleChange(configs: ConfigsSchema) {
		props.setConfigs(configs);
		props.finally();
	}

	return (
		<FormContainer onSubmit={handleSubmit(handleChange)}>
			<h1>Configurações</h1>
			<Checkbox
				label={"Mostrar finais de semana"}
				alignment="horizontal"
				{...register("weekends")}
			/>
			<Input
				label="Primeiro dia da semana"
				type="number"
				{...register("firstDayWeek")}
			/>
			<Input
				label="Duração dos intervalos"
				type="number"
				{...register("timeInterval")}
			/>
			<Checkbox
				label={"Minimizar cronograma"}
				alignment="horizontal"
				{...register("minimizeTimeSpan")}
			/>
			<Button type="submit">Salvar</Button>
		</FormContainer>
	);
}
