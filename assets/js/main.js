// GoatBandit
// Front Page Buttons

// On About Button Click
$ ('.aboutButton').click (function (e) 
{
	$ ('.about').fadeIn (500);
	$ ('.aboutEffect').removeClass ('transform-out').addClass ('transform-in');

	e.preventDefault();
});

	// On About Button Close Click
	$ ('.about .inner .close').click (function (e) 
	{
		$ ('.about').fadeOut (500);
		// JUST REMEMBER TO FIX THIS PROBLEM
		$ ('.aboutEffect').removeClass ('transform-in').addClass ('transform-out');
	
		e.preventDefault();
	});

// On Skills Button Click
$ ('.skillsButton').click (function (e) 
{
	$ ('.skills').fadeIn (500);
	$ ('.skillsEffect').removeClass ('transform-out').addClass ('transform-in');

	e.preventDefault();
});

	// On Skills Button Close Click
	$ ('.skills .inner .close').click (function (e) 
	{
		$ ('.skills').fadeOut (500);
		$ ('.skillsEffect').removeClass ('transform-in').addClass ('transform-out');
	
		e.preventDefault();
	});

// On Work Button Click
$ ('.workButton').click (function (e) 
{
	$ ('.work').fadeIn (500);
	$ ('.workEffect').removeClass ('transform-out').addClass ('transform-in');

	e.preventDefault();
});

	// On Work Button Close Click
	$ ('.work .inner .close').click (function (e) 
	{
		$ ('.work').fadeOut (500);
		$ ('.workEffect').removeClass ('transform-in').addClass ('transform-out');
	
		e.preventDefault();
	});

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
		setLargeBoxAnim();
	updateProjectDivHeights();
});
updateProjectDivHeights();