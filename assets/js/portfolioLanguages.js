let going = false;
let currentEl = null;

// Language buttons
const languageButtons = document.querySelectorAll('.lang-button');

// For language large box animation
const lineDownSvg = document.querySelector('#linedown');
	const lineDown = lineDownSvg.firstElementChild;
const mapping = document.querySelector('#mapping');
	const boxLeft = document.querySelector('#rectleft');
	const boxRight = document.querySelector('#rectright');

for (let button of languageButtons) 
{
	button.addEventListener('click', () => 
	{
		if (going) return;
		going = true;
		clearTimeout(mapping.langTimeout);
		mapping.style.opacity = '0';
		window.localStorage.hideClickToLang = true;
		clearTimeout(mapping.exitTimeout);

		if (button.className.includes('active')) 
		{
			button.className = 'lang-button';
			undoLargeBoxAnim(0.5);
			
			setTimeout(() => 
			{
				boxLeft.style.stroke = 'transparent';
				boxRight.style.stroke = 'transparent';
				going = false;
			}, 500);
			mapping.style.opacity = '0';
			clearTimeout(mapping.exitTimeout);
			window.localStorage.hideClickToExit = true;
			return;
		}

		// Remove underline from old lang
		if (currentEl) currentEl.className = 'lang-button';
		button.className = 'lang-button active';

		// Do line down animation
		let x = (button.offsetLeft + button.clientWidth / 2);
		lineDownSvg.style.left = x + 'px';
		lineDownSvg.style.opacity = '1';
		lineDown.style.transition = 'stroke-dashoffset 0.5s linear';
		lineDown.style.stroke = button.style.color;
		lineDown.style.strokeDashoffset = '-100px';

		// Do rectangle path
		currentEl = button;
		setLargeBoxAnim();
		undoLargeBoxAnim(0.25);
		setTimeout(doLargeBoxAnim, 250, button.style.color);

		setTimeout(() => 
		{
			// Reset lineDown
			lineDownSvg.style.opacity = '0';
			lineDown.style.transition = 'initial';
			lineDown.style.strokeDashoffset = '100px';

			let panel = document.getElementById(button.getAttribute('data-panel'));
			panel.classList.add('shown');
			going = false;

			// Animate all the children
			let divs = panel.querySelectorAll('.projects>.proj');
			let timeout = 200;
			for (let div of divs) 
			{
				setTimeout(() => div.classList.add('loaded'), timeout);
				timeout += 100;
			}
		}, 500);

		// exit thingy timeout
		if (!window.localStorage.hideClickToExit) 
		{
			mapping.exitTimeout = setTimeout(() => 
			{
				mapping.innerText = '(click again to exit)';
				mapping.style.opacity = '0.5';
			}, 2500);
		}

	});
}

// Set the details for the opening animation for the language buttons
function setLargeBoxAnim() 
{
	let x = (currentEl.offsetLeft + currentEl.clientWidth / 2);

	let innerHeight = window.innerHeight - boxLeft.parentElement.getBoundingClientRect().y - 25;

	// THIS IS AN ISSUE. THIS CALCULATION CAUSES SMALLER SCREENS TO HAVE BOX OVERFLOW!
	// I am not sure how to fix this as the box origin point changes based on the selected language location.
	let innerWidth = window.innerWidth - x - 45;

	// Create and set SVG pathing (x,y)
	boxLeft.setAttribute('d', `M ${x + 2},-50
							40,-50 									0,0
							0,40 									0,${innerHeight - 40}
							40,${innerHeight} 100,${innerHeight} 	${innerWidth},${innerHeight}`);
	boxRight.setAttribute('d', `M -2,-50
							 ${innerWidth - 40},-50 				${innerWidth},0
							 ${innerWidth},40 						${innerWidth},${innerHeight - 40}
							 ${innerWidth - 40},${innerHeight} 		${innerWidth - x},${innerHeight}`);
	boxRight.style.transform = `translateX(${x + 1}px) translateY(1px)`;
	
	// Reset everything
	let len = boxLeft.getTotalLength();
	boxLeft.style.transition = 'initial';
	boxLeft.style.strokeDasharray = len;
	boxRight.style.transition = 'initial';
	boxRight.style.strokeDasharray = len;

}

	// Do the opening animation for the language buttons
	function doLargeBoxAnim(color) 
	{
		boxLeft.style.stroke = color;
		boxRight.style.stroke = color;

		// Do animation
		boxLeft.style.transition = 'stroke-dashoffset .75s ease-in-out';
		boxRight.style.transition = 'stroke-dashoffset .75s ease-in-out';
		boxLeft.style.strokeDashoffset = '0';
		boxRight.style.strokeDashoffset = '0';
	}

		// Close the opening animation for the language buttons
		function undoLargeBoxAnim(seconds) 
		{
			let len = boxLeft.getTotalLength();
			boxLeft.style.transition = `stroke-dashoffset ${seconds}s ease-in-out`;
			boxRight.style.transition = `stroke-dashoffset ${seconds}s ease-in-out`;
			boxLeft.style.strokeDashoffset = len;
			boxRight.style.strokeDashoffset = len;

			// Hide current panel
			let shownPanel = document.querySelector('.lang-panel.shown');
			if (shownPanel) 
			{
				shownPanel.classList.remove('shown');
				shownPanel.querySelectorAll('.projects>.proj').forEach(c => c.className = 'proj');
			}
		}

let projs = document.querySelectorAll('.proj');

const projectDivs = document.querySelectorAll('.projects');

function updateProjectDivHeights() 
{
	for (let div of projectDivs) 
	{
		div.style.height = window.innerHeight - div.getBoundingClientRect().y - 30 + 'px';
	}

	for (let bar of scrollbars) 
	{
		bar.update();
	}
}

let scrollbars = Array.from(document.querySelectorAll('.projects')).map(bar => new PerfectScrollbar(bar));
window.addEventListener('resize', () => 
{
	if (currentEl)
	{
		setLargeBoxAnim();
	}
	
	updateProjectDivHeights();
});

updateProjectDivHeights();
