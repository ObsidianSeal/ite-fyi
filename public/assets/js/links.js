"use strict";

const defaultURL = "https://linktr.ee/uwite";
let redirected = false;

if (window.location.href == "https://ite.fyi/") {
	redirected = true;
	window.location.href = defaultURL;
}

if (!redirected) {
	try {
		const requestURL = "https://ite.fyi/assets/csv/links.csv";
		const request = new Request(requestURL);
		const response = await fetch(request);
		const text = await response.text();

		let links = text.split("\n").filter((line) => line.trim() != "");
		let header = true;
		for (let link of links) {
			if (header) {
				header = false;
				continue;
			}
			let from = link.split(",")[0];
			let to = link.split(",")[1];
			if (window.location.pathname.substring(1) == from) {
				redirected = true;
				window.location.href = to;
			}
		}
	} catch (error) {
		console.error(error);
	}
}

if (!redirected) window.location.href = defaultURL;
