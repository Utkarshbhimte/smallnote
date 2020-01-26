import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
	body{
		background-color: ${props => props.theme.background};
	}


	[contenteditable="true"] {
		min-height: 1.2rem;
		position: relative;
		padding: 0 1rem;
		background-color: ${props => props.theme.cardBackground};
		color: ${props => props.theme.primaryText};

		&:focus,
		&:hover,
		&:active {
			outline: none;
			border: none;
		}

		&::after {
			content: attr(placeholder);
			position: absolute;
			display: block;
			top: 0;
			left: 1rem;
			font-weight: 400;
			color: ${props => props.theme.primaryText};
		}

		&:not(:empty) {
			&::after {
			display: none;
			}
		}
	}
`
