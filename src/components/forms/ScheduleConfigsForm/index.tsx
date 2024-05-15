import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Configs } from "@/types/configs";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import { FormContainer } from "@/components/forms/styles";

import { configsSchema, ConfigsSchema } from "./types";
import Button from "@/components/ui/Button";

interface ScheduleConfigsFormProps {
	initialConfigs: Configs;
	updateConfigs: (newConfigs: Configs) => void;
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
		props.updateConfigs(configs);
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
				label={"Minimizar intervalo de tempo"}
				alignment="horizontal"
				{...register("minimizeTimeSpan")}
			/>
			<Button type="submit">Salvar</Button>
		</FormContainer>
	);
}
