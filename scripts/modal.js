function openModal() {
	const modalBackground = document.getElementsByClassName("modal")[0].parentElement;
	modalBackground.style.visibility = "visible";
	modalBackground.style.opacity = 1;
}

function closeModal() {
	const modalBackground = document.getElementsByClassName("modal")[0].parentElement;
	modalBackground.style.visibility = "hidden";
	modalBackground.style.opacity = 0;
}
