"use strict";

const defaultURL = "https://linktr.ee/ite.uw";
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
			let line = link.split(",");
			let from = line[0].trim();
			let to = line[1].trim();
			if (/^".+"$/.test(to)) to = to.substring(1, to.length - 2);
			let description = line[2].trim();
			let expiry = line[3].trim();
			if (window.location.pathname.substring(1) == from) {
				console.log(from, to, description, expiry);
				redirected = true;
				window.location.href = to;
			}
		}
	} catch (error) {
		console.error(error);
	}
}

if (!redirected) window.location.href = defaultURL;
