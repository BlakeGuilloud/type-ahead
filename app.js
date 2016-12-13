const jsonData = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

function findMatches(word, citiesToFilter) {
  return citiesToFilter.filter(place => {
    const regex = new RegExp(word, 'gi');

    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);

  const html = matchArray.map(place => {
    return `
      <li>
        <span className="name">${place.city}, ${place.state}</span>
        <span className="population">${place.population}</span>
      </li>`;
  });

  suggestions.innerHTML = html.join(' ');
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

const cities = [];

fetch(jsonData)
  .then(blob => blob.json())
  .then(data => cities.push(...data));
