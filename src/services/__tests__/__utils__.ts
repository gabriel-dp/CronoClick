import {
	noteType,
	scheduleType,
	subjectType,
	taskType,
	userType
} from "@/utils/validations";

function unique(length = 10) {
	const time = process.hrtime.bigint();
	const divisorStr = "1" + "0".repeat(length);
	const divisor = BigInt(divisorStr);
	const lastNDigits = time % divisor;
	return lastNDigits.toString().padStart(length, "0");
}

function randomNumber(min = 0, max = 64) {
	return Math.floor(Math.random() * max) + min;
}

export const testUser = (): userType => ({
	username: `User${unique()}`,
	email: `user${unique()}@example.com`,
	password: `password${unique()}`
});

export const testSchedule = (): scheduleType => ({
	name: `Schedule${unique()}`
});

export const testSubject = (): subjectType => ({
	name: `Subject${unique()}`,
	color: `#${unique(6)}`,
	teacher: `Teacher${unique()}`,
	times: [
		{
			days: randomNumber(1, 64),
			duration: randomNumber(60, 240),
			start: randomNumber(600, 1200)
		}
	]
});

export const testTask = (): taskType => ({
	name: `Task${unique()}`,
	finished: Math.random() < 0.5,
	submission: `${unique(4)}-01-01`
});

export const testNote = (): noteType => ({
	description: `Description${unique()}`
});
