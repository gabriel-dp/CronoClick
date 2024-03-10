import { useContext } from "react";
import { ThemeContext } from "styled-components";

export function useTheme() {
	const context = useContext(ThemeContext);
	return context;
}
