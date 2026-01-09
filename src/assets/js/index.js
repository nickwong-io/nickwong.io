$(document).foundation();

var d = new Date();
var n = d.getDay();

if (n === 5) {
	console.log('Aloha Friday!');

	//image styles
	$('.hero_image').css("background-image", "url(\"assets/images/nicksGrad_compressed.jpg\")");
	$('.hero_image').css("background-position", "50% 35%");
	$('#small-hero-image').attr("src", "assets/images/nicksGrad_compressed.jpg");

	// header styles
	$('#reg').replaceWith("Happy Aloha Friday! 🤙🏼")
}

function handleBanner() {
	$('.announcement_banner').css("display", "none");
}

// ========== Pane Navigation System ==========
(function() {
	// Only run on desktop (medium and up)
	if (window.innerWidth < 640) {
		return;
	}

	let currentPane = 0;
	const totalPanes = 3;
	let isTransitioning = false;
	let scrollTimeout;
	
	// Throttle function to limit event frequency
	function throttle(func, limit) {
		let inThrottle;
		return function() {
			const args = arguments;
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		}
	}
	
	// Update active pane
	function updateActivePane(paneIndex) {
		if (paneIndex === currentPane || paneIndex < 0 || paneIndex >= totalPanes) {
			return;
		}
		
		currentPane = paneIndex;
		
		// Update panes
		$('.pane').removeClass('active');
		$(`.pane[data-pane="${paneIndex}"]`).addClass('active');
		
		// Update navigation indicators
		$('.nav-indicator').removeClass('active');
		$(`.nav-indicator[data-pane="${paneIndex}"]`).addClass('active');
	}
	
	// Handle scroll/wheel events
	const handleScroll = throttle(function() {
		const scrollPos = window.scrollY || window.pageYOffset;
		
		// Define very small scroll thresholds (in pixels)
		const thresholds = [0, 50, 100];
		
		let newPane = 0;
		for (let i = 0; i < thresholds.length; i++) {
			if (scrollPos >= thresholds[i]) {
				newPane = i;
			}
		}
		
		updateActivePane(newPane);
	}, 100);
	
	// Handle wheel events for pane switching without requiring page scroll
	let wheelTimeout;
	let wheelDelta = 0;
	
	$(window).on('wheel', function(e) {
		if (isTransitioning) return;
		
		const delta = e.originalEvent.deltaY;
		wheelDelta += delta;
		
		clearTimeout(wheelTimeout);
		wheelTimeout = setTimeout(function() {
			// Reduced threshold for more sensitivity
			if (Math.abs(wheelDelta) > 20) {
				if (wheelDelta > 0 && currentPane < totalPanes - 1) {
					// Scrolling down
					updateActivePane(currentPane + 1);
					isTransitioning = true;
					setTimeout(() => { isTransitioning = false; }, 400);
				} else if (wheelDelta < 0 && currentPane > 0) {
					// Scrolling up
					updateActivePane(currentPane - 1);
					isTransitioning = true;
					setTimeout(() => { isTransitioning = false; }, 400);
				}
				wheelDelta = 0;
			}
		}, 8);
	});
	
	// Handle navigation indicator clicks
	$('.nav-indicator').on('click', function() {
		const targetPane = parseInt($(this).data('pane'));
		updateActivePane(targetPane);
	});
	
	// Also handle regular scroll for fallback
	$(window).on('scroll', handleScroll);
	
	// Handle window resize
	$(window).on('resize', function() {
		if (window.innerWidth < 640) {
			// Mobile: show all panes
			$('.pane').addClass('active');
		} else {
			// Desktop: restore pane navigation
			$('.pane').removeClass('active');
			$(`.pane[data-pane="${currentPane}"]`).addClass('active');
		}
	});
})();
