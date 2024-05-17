import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Configs } from "@/types/configs";
import { getLocalDaysNames } from "@/utils/timeUtils";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import MultiOption from "@/components/ui/MultiOption";
import { FormContainer } from "@/components/forms/styles";

import { configsSchema, ConfigsSchema } from "./types";

interface ScheduleConfigsFormProps {
	configs: Configs;
	setConfigs: (newConfigs: Configs) => void;
	finally: () => void;
}

export default function ScheduleConfigsForm(props: ScheduleConfigsFormProps) {
	const { register, handleSubmit, reset, watch, setValue } =
		useForm<ConfigsSchema>({
			resolver: zodResolver(configsSchema)
		});

	// Sets initial values
	useEffect(() => {
		reset(props.configs);
	}, [reset, props.configs]);

	function handleChange(configs: ConfigsSchema) {
		props.setConfigs(configs);
		props.finally();
	}

	// Enables weekends if the first day of the week is the weekend
	if (watch("firstDayWeek") == "0" || watch("firstDayWeek") == "6") {
		setValue("weekends", true);
	}

	const days = getLocalDaysNames();

	return (
		<FormContainer onSubmit={handleSubmit(handleChange)}>
			<h1>Configurações</h1>
			<MultiOption
				label="Primeiro dia da semana"
				options={[
					[days[0], 0],
					[days[1], 1]
				]}
				{...register("firstDayWeek")}
			/>
			<Checkbox
				label={"Mostrar finais de semana"}
				alignment="horizontal"
				{...register("weekends")}
			/>
			<hr />
			<MultiOption
				label="Duração dos intervalos"
				options={[
					["15 min", 15],
					["30 min", 30],
					["60 min", 60]
				]}
				{...register("timeInterval")}
			/>
			<Checkbox
				label={"Minimizar cronograma"}
				alignment="horizontal"
				{...register("minimizeTimeSpan")}
			/>
			<hr />
			<Button type="submit">Salvar</Button>
		</FormContainer>
	);
}
