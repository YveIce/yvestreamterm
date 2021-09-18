/** Credits: http://maettig.com/code/javascript/asciifire.html */
import { el, clear } from "../../util/screens.js";
import { waitForKey } from "../../util/io.js";

async function fire2() {
	clear();

	return new Promise(async resolve => {
		let element = el("pre");
		element.classList.add("fire");

		let eWidth = element.offsetWidth;
		const cols = Math.floor(eWidth / 20) + 1;

		let size = cols * 25;
		let fire;
		let b = [];
		let i;
		for (i = 0; i < size + (cols+1); i++) b[i] = 0;
		let char = " .:*evY$#".split("");
		let interval;

		function f() {
			for (i = 0; i < 10; i++)
				b[Math.floor(Math.random() * cols) + cols * 24] = 80;
			fire = "";
			for (i = 0; i < size; i++) {
				b[i] = Math.floor(
					(b[i] + b[i + 1] + b[i + cols] + b[i + cols +1]) / 4
				);
				fire += char[b[i] > 7 ? 7 : b[i]];
				if (i % cols > (cols-2)) fire += "\r\n";
			}
			element.innerHTML = fire;
		}

		interval = setInterval(f, 30);

		await waitForKey();

		clearInterval(interval);
		clear();

		resolve();
	});
}

export default fire2;
