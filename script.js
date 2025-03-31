const dailyOption = document.getElementById('daily');
const weeklyOption = document.getElementById('weekly');
const monthlyOption = document.getElementById('monthly');

const handleTimeOption = (e) => {
  e.preventDefault();
  const targetId = e.target.id;
  // console.log(targetId);
}

dailyOption.addEventListener('click', handleTimeOption);
weeklyOption.addEventListener('click', handleTimeOption);
monthlyOption.addEventListener('click', handleTimeOption);