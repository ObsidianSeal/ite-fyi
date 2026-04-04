"use strict";

const defaultURL = "https://linktr.ee/uwite";
if (window.location.href == "https://ite.fyi/") window.location.href = defaultURL;

try {
	const requestURL = "https://ite.fyi/assets/csv/links.csv";
	const request = new Request(requestURL);
	const response = await fetch(request);
	const text = await response.text();

	let links = text.split("\n");
	for (let link of links) {
		let from = link.split(",")[0];
		let to = link.split(",")[1];
		if (window.location.href.substring(16) == from) window.location.href = to;
	}
} catch (error) {
	console.error(error);
}

window.location.href = defaultURL;
