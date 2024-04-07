// Turns the modal visible
function openModal() {
	const modalBackground = document.getElementsByClassName("modal")[0].parentElement;
	modalBackground.style.visibility = "visible";
	modalBackground.style.opacity = 1;
}

// Turns the modal invisible
function closeModal() {
	const modalBackground = document.getElementsByClassName("modal")[0].parentElement;
	modalBackground.style.visibility = "hidden";
	modalBackground.style.opacity = 0;
}
