function isInteger(number) {
  return number - Math.floor(number) === 0;
}

function isNumberEven(number) {
  return number % 1 === 0;
}

function getNumberOfRectangles(number) {
  const validNumber = parseInt(number, 10);
  const numberSquareRoot = Math.sqrt(validNumber);
  const checkingPoint = Math.floor(numberSquareRoot);
  const rawNumberOfRectangles = Array(checkingPoint)
  	.fill(0)
    .reduce((numberOfRectangles, val, index) => {
    	if (isInteger(validNumber / (index + 1))) {
      	return numberOfRectangles + 1;
      }

      return numberOfRectangles;
    }, 0);

  if (isInteger(numberSquareRoot)) {
  	return rawNumberOfRectangles * 2 - 1
  }

  if (validNumber % 2 === 0) {
  	return rawNumberOfRectangles * 2;
  }

  return 2;
}

function getRectanglesForCombinations(combinations) {
  let number = 0;

  for (let index = 1; index <= 1000000; index++) {
    const numberOfRectangles = getNumberOfRectangles(index);

    if (numberOfRectangles === combinations) {
      number = index;
      break;
    }
  }

  return number === 0 ? 'Not found' : number;
}

function getNumberOfRectanglesForRange(from, to) {
  return Array(to - from + 1).fill(0).map((val, index) => ({
    size: index + from,
    combinations: getNumberOfRectangles(index + from)
  }));
}

const $combinationsButton = document.querySelector('#combinations-button');
const $combinationsInput = document.querySelector('#numberOfCombinations');
const $peopleValue = document.querySelector('#peopleValue');

$combinationsButton.addEventListener('click', () => {
  const value = parseFloat($combinationsInput.value);

  if (!value || value < 1 || !isInteger(value) || value > 200) {
    return $peopleValue.innerHTML = '';
  }

  return $peopleValue.innerHTML = getRectanglesForCombinations(value);
});

const $peopleButton = document.querySelector('#people-button');
const $peopleInput = document.querySelector('#numberOfPeople');
const $combinationsValue = document.querySelector('#combinationsValue');

$peopleButton.addEventListener('click', () => {
  const value = parseFloat($peopleInput.value);

  if (!value || value < 1 || !isInteger(value) > 1000000) {
    return $combinationsValue.innerHTML = '';
  }

  return $combinationsValue.innerHTML = getNumberOfRectangles(value);
});

const $rangeButton = document.querySelector('#range-button');
const $from = document.querySelector('#from');
const $to = document.querySelector('#to');
const $tableWrapper = document.querySelector('.table-wrapper');
const $table = document.querySelector('#table');

$rangeButton.addEventListener('click', () => {
  const from = parseFloat($from.value);
  const to = parseFloat($to.value);

  if (!from || from < 1 || !isInteger(from) > 1000000) {
    return $from.innerHTML = '';
  }

  if (!to || to < 1 || !isInteger(to) > 1000000 || from >= to) {
    return $to.innerHTML = '';
  }

  const combinations = getNumberOfRectanglesForRange(from, to);

  $table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Band size</th>
        <th scope="col">Number of combinations</th>
      </tr>
    </thead>
    <tbody>
      ${
        combinations.map(({size, combinations}) => {
          return `<tr>
          <td>${size}</td>
          <td>${combinations}</td>
        </tr>`
        }).join('')
      }
    </tbody>
  `

  $tableWrapper.classList.remove('hidden');
});
