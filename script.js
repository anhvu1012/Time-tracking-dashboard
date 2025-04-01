const dataSource = './data.json';
let allValidData = [];

const allTimeOptions = Array.from(document.querySelectorAll('.btn'));
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
    <h2>
      <span>${item.title}</span>
      <img src="images/icon-ellipsis.svg" alt="more icon" />
    </h2>
    <section>
      <span>${timeframeObj.current}hrs</span>
      <span>Previous - ${timeframeObj.previous}hrs</span>
    </section>
  `;
  containers.push(container);
};

const populateDOM = (data, targetId) => {
  data.forEach(item => {
    createContainer(item, item.timeframes[targetId]);
  });

  displayContainers(containers);
};

const fetchData = async () => {
  try {
    const response = await fetch(dataSource);
    const data = await response.json();
    allValidData = data;
  } catch (error) {
    console.error('Error fetching JSON file: ', err);
  }
}

const addActiveClass = (targetId) => {
  // console.log(allTimeOptions);
  allTimeOptions.forEach(option => option.classList.remove('active'));

  const target = allTimeOptions.find(option => option.id === targetId);
  // console.log(target);
  target.classList.add('active');
}

const handleTimeOption = (e) => {
  e.preventDefault();
  containers = [];
  const targetId = e.target.id;

  addActiveClass(targetId);

  populateDOM(allValidData, targetId);
};

fetchData();

document.addEventListener('DOMContentLoaded', async () => {
  await fetchData(); // Ensure data is fetched before populating
  populateDOM(allValidData, 'weekly');
  addActiveClass('weekly');
});

dailyOption.addEventListener('click', handleTimeOption);
weeklyOption.addEventListener('click', handleTimeOption);
monthlyOption.addEventListener('click', handleTimeOption);