import { getAllData } from "./subjects.js";
import { formatMinutesToTime, percentageRatio } from "./times.js";

// Object to store the main schedule
const initialSchedule = {
	id: "",
	name: "",
	subjects: [],
};

function generateWeek() {
	const { startFloor, endCeil, days, weekClasses, interval } = getAllData(initialSchedule);
	const intervals = Math.ceil((endCeil - startFloor) / interval) + 1;

	// Get schedule elements
	const daysRow = document.getElementsByClassName("days-row")[0];
	const timesColumn = document.getElementsByClassName("times-column")[0];
	const classesGrid = document.getElementsByClassName("classes-grid")[0];

	// Reset previous data
	daysRow.innerHTML = "";
	timesColumn.innerHTML = "";
	classesGrid.innerHTML = "";

	// Insert all days in daysRow
	days.forEach((day) => {
		const singleDay = document.createElement("div");
		singleDay.className = "day";

		const name = document.createTextNode(day);
		singleDay.appendChild(name);

		daysRow.appendChild(singleDay);
	});

	// Insert all time intervals in timeColumn
	for (let i = 0; i < intervals; i++) {
		const singleTime = document.createElement("div");
		singleTime.className = "time";

		const time = formatMinutesToTime(startFloor + interval * i);
		const text = document.createTextNode(time);
		singleTime.appendChild(text);

		timesColumn.appendChild(singleTime);
	}

	// Insert all day columns and its horizontal lines in classesGrid
	days.forEach((day) => {
		const dayColumn = document.createElement("div");
		dayColumn.className = "day-column";

		for (let i = 0; i < intervals; i++) {
			const horizontalLine = document.createElement("hr");
			dayColumn.appendChild(horizontalLine);
		}

		classesGrid.appendChild(dayColumn);
	});

	// Insert all classes
	weekClasses.forEach((dayClasses, i) => {
		dayClasses.forEach((singleClass) => {
			// Create class timeSpan element
			const timeSpan = document.createElement("div");
			timeSpan.className = "time-span";
			timeSpan.style.top = `${percentageRatio(singleClass.start, startFloor, endCeil)}%`;
			timeSpan.style.bottom = `${
				100 - percentageRatio(singleClass.start + singleClass.duration, startFloor, endCeil)
			}%`;

			// Create class card element
			const classCard = document.createElement("div");
			classCard.className = "class-card";
			classCard.style.backgroundColor = singleClass.subject.color;

			// Create class subject name element
			const subjectName = document.createElement("p");
			subjectName.appendChild(document.createTextNode(singleClass.subject.name));
			subjectName.className = "name";

			// Create class subject teacher element
			const teacherName = document.createElement("p");
			teacherName.appendChild(document.createTextNode(singleClass.subject.teacher));
			teacherName.className = "teacher";

			// Insert the class in the correct day
			classCard.appendChild(subjectName);
			classCard.appendChild(teacherName);
			timeSpan.appendChild(classCard);
			classesGrid.children[i].appendChild(timeSpan);
		});
	});
}

export function addSubject(subject) {
	initialSchedule.subjects.push(subject);
	generateWeek();
}

// Renders an empty schedule
generateWeek();
