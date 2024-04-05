import { getAllData } from "./subjects.js";
import { formatMinutesToTime } from "./times.js";

const { startFloor, endCeil, days, weekClasses, interval } = getAllData();
const intervals = Math.ceil((endCeil - startFloor) / interval) + 1;

const daysRow = document.getElementsByClassName("days-row")[0];
const timesColumn = document.getElementsByClassName("times-column")[0];
const classesGrid = document.getElementsByClassName("classes-grid")[0];

days.forEach((day) => {
	const singleDay = document.createElement("div");
	singleDay.className = "day";

	const name = document.createTextNode(day);
	singleDay.appendChild(name);

	daysRow.appendChild(singleDay);
});

for (let i = 0; i < intervals; i++) {
	const singleTime = document.createElement("div");
	singleTime.className = "time";

	const time = formatMinutesToTime(startFloor + interval * i);
	const text = document.createTextNode(time);
	singleTime.appendChild(text);

	timesColumn.appendChild(singleTime);
}

days.forEach((day) => {
	const dayColumn = document.createElement("div");
	dayColumn.className = "day-column";

	for (let i = 0; i < intervals; i++) {
		const horizontalLine = document.createElement("hr");
		dayColumn.appendChild(horizontalLine);
	}

	classesGrid.appendChild(dayColumn);
});

function percentageRatio(value) {
	const ratio = (value - startFloor) / (endCeil - startFloor);
	return ratio * 100;
}

weekClasses.forEach((dayClasses, i) => {
	dayClasses.forEach((singleClass) => {
		const timeSpan = document.createElement("div");
		timeSpan.className = "time-span";
		timeSpan.style.top = `${percentageRatio(singleClass.start)}%`;
		timeSpan.style.bottom = `${100 - percentageRatio(singleClass.start + singleClass.duration)}%`;

		const classCard = document.createElement("div");
		classCard.className = "class-card";
		classCard.style.backgroundColor = singleClass.subject.color;

		const subjectName = document.createElement("p");
		subjectName.appendChild(document.createTextNode(singleClass.subject.name));
		subjectName.className = "name";

		const teacherName = document.createElement("p");
		teacherName.appendChild(document.createTextNode(singleClass.subject.teacher));
		teacherName.className = "teacher";

		classCard.appendChild(subjectName);
		classCard.appendChild(teacherName);
		timeSpan.appendChild(classCard);
		classesGrid.children[i].appendChild(timeSpan);
	});
});
