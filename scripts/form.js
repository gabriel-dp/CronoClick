import { formatTimeToMinutes } from "./times.js";
import { addSubject } from "./index.js";

// Reset all input values
function clearForm() {
	const CLEAR_DELAY = 250; // delay should be equal to the modal transition time
	new Promise(() =>
		setTimeout(() => {
			document.getElementById("name").value = "";
			document.getElementById("teacher").value = "";
			document.getElementById("color").value = "#000000";
			document.getElementsByClassName("form-list")[0].innerHTML = "";
		}, CLEAR_DELAY)
	);
}

// Create new subject based on provided data
function create() {
	const name = document.getElementById("name").value;
	const teacher = document.getElementById("teacher").value;
	const color = document.getElementById("color").value;
	const times = [];

	const timeList = document.getElementsByClassName("form-list")[0];
	if (name.length === 0) {
		alert("DEFINA O NOME!");
		return;
	} else if (timeList.children.length === 0) {
		alert("ADICIONE UMA OCORRÊNCIA!");
		return;
	}

	const timesFromList = timeList.children;
	for (let i = 0; i < timesFromList.length; i++) {
		const newTime = { days: 0, start: 0, duration: 0 };
		const time = timesFromList[i];

		newTime.start = formatTimeToMinutes(time.children[1].children[0].children[1].value);

		newTime.duration = parseInt(time.children[1].children[1].children[1].value);
		if (newTime.duration <= 0) {
			alert("DURAÇÃO MENOR OU IGUAL A ZERO NÃO DÁ NÉ");
			return;
		}

		const { children: days } = time.children[0];
		for (let j = 0; j < days.length; j++) {
			if (days[j].children[1].checked == true) {
				newTime.days += Math.pow(2, j);
			}
		}

		if (newTime.days === 0) {
			alert(`MARQUE PELO MENOS UM DIA NA OCORRÊNCIA ${i + 1}!`);
			return;
		}

		times.push(newTime);
	}

	clearForm();
	closeModal();

	const newSubject = { name, teacher, color, times };
	addSubject(newSubject);
}

// Cancel form data
function cancel() {
	clearForm();
	closeModal();
}

// Add action functions to each button
document.getElementById("create-button").addEventListener("click", create);
document.getElementById("cancel-button").addEventListener("click", cancel);

//-----

const occurrencesList = document.getElementsByClassName("form-list")[0];

function removeOccurrence(event) {
	const occurrence = event.target.parentElement;
	occurrencesList.removeChild(occurrence);
}

const DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
function addOccurrence() {
	// Create occurrence element
	const newOccurrence = document.createElement("div");
	newOccurrence.className = "form-group";

	// Create week days input
	const daysInput = document.createElement("div");
	daysInput.className = "form-row";
	DAYS.forEach((day) => {
		const dayInputDiv = document.createElement("div");
		dayInputDiv.className = "day-input";
		const dayLabel = document.createElement("label");
		dayLabel.appendChild(document.createTextNode(day));
		const dayInput = document.createElement("input");
		dayInput.type = "checkbox";
		dayInputDiv.appendChild(dayLabel);
		dayInputDiv.appendChild(dayInput);
		daysInput.appendChild(dayInputDiv);
	});

	const timeDiv = document.createElement("div");
	timeDiv.className = "form-row";

	// Create start time input
	const timeInputDiv = document.createElement("div");
	timeInputDiv.className = "input";
	const timeInput = document.createElement("input");
	timeInput.type = "time";
	timeInput.value = "08:00";
	const timeLabel = document.createElement("label");
	timeLabel.appendChild(document.createTextNode("Início"));
	timeInputDiv.appendChild(timeLabel);
	timeInputDiv.appendChild(timeInput);

	// Create duration number input
	const numberInputDiv = document.createElement("div");
	numberInputDiv.className = "input";
	const numberInput = document.createElement("input");
	numberInput.type = "number";
	numberInput.min = 0;
	const numberLabel = document.createElement("label");
	numberLabel.appendChild(document.createTextNode("Duração (min)"));
	numberInputDiv.appendChild(numberLabel);
	numberInputDiv.appendChild(numberInput);

	timeDiv.appendChild(timeInputDiv);
	timeDiv.appendChild(numberInputDiv);

	// Create button to delete occurrence
	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.className = "delete-button";
	deleteButton.appendChild(document.createTextNode("X"));
	deleteButton.addEventListener("click", removeOccurrence);

	// Insert the new occurrence in the list
	newOccurrence.appendChild(daysInput);
	newOccurrence.appendChild(timeDiv);
	newOccurrence.appendChild(deleteButton);
	occurrencesList.appendChild(newOccurrence);
}

// Add event to button add the occurrence
document.getElementById("add-button").addEventListener("click", addOccurrence);
