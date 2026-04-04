"use strict";

const defaultURL = "https://linktr.ee/uwite";
if (window.location.href == "https://ite.fyi/") window.location.href = defaultURL;

try {
	const requestURL = "https://ite.fyi/assets/csv/links.csv";
	const request = new Request(requestURL);
	const response = await fetch(request);
	const text = await response.text();

	console.log(text);
} catch (error) {
	console.error(error);
	// window.location.href = defaultURL;
}
