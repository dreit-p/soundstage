import countdown from 'countdown';

(()=>{
	document.querySelectorAll('.countdown-timer[data-deadline]').forEach(function(wrapper) {
		updateUI(wrapper, getDeadlineData(wrapper.dataset.deadline));
		setInterval(function() {
			updateUI(wrapper, getDeadlineData(wrapper.dataset.deadline));
		}, 1000);
	});

	function getDeadlineData(deadlineString) {
		let deadline = new Date(deadlineString);

		return countdown(deadline,
			new Date >= deadline ? deadline : new Date,
			countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
	}

	function updateUI(timerWrapper, data) {
		let leadZeroes = n=>n<10 ? '0'+n : n;
		timerWrapper.querySelector('.day .number').innerHTML = leadZeroes(data.days);
		timerWrapper.querySelector('.hrs .number').innerHTML = leadZeroes(data.hours);
		timerWrapper.querySelector('.min .number').innerHTML = leadZeroes(data.minutes);
		timerWrapper.querySelector('.sec .number').innerHTML = leadZeroes(data.seconds);
	}
})()
