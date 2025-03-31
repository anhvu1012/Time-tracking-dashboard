const dailyOption = document.getElementById('daily');
const weeklyOption = document.getElementById('weekly');
const monthlyOption = document.getElementById('monthly');

const contentContainers = Array.from(document.querySelectorAll('.content-container'));

let containers = [];

const displayContainers = (containers) => {
  contentContainers.forEach((item, itemIndex) => {
    item.innerHTML = containers[itemIndex];
  });
};

const createContainer = (item, timeframeObj) => {
  const container = 
  `
    <header>
      <span>${item.title}</span>
      <img src="images/icon-ellipsis.svg" alt="more icon" />
    </header>
    <main>
      <span>${timeframeObj.current}</span>
      <span>Previous - ${timeframeObj.previous}hrs</span>
    </main>
  `;

  containers.push(container);
  
  // displayContainers(containers);
};

const populateDOM = (data, targetId) => {
  data.forEach(item => {
    createContainer(item, item.timeframes[`${targetId}`]);
  });

  // console.log(containers);
  displayContainers(containers);
};

const handleTimeOption = (e) => {
  e.preventDefault();
  containers = [];
  const targetId = e.target.id;

  fetch('./data.json')
  .then((response) => response.json())
  .then((data) => populateDOM(data, targetId))
  .catch((err) => {
    console.error('Error fetching JSON file: ', err);
  });
};

dailyOption.addEventListener('click', handleTimeOption);
weeklyOption.addEventListener('click', handleTimeOption);
monthlyOption.addEventListener('click', handleTimeOption);