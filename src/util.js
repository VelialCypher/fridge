// Date
const addZero = (number) => {
	if(number < 10) return "0" + number;
	else return number;
};

export const dateToString = (date) => {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	return `${addZero(day)}.${addZero(month)}.${year}`;
};

export const differenceBetweenDates = (dateA, dateB) => {
	return Math.floor((dateA - dateB) / (60 * 60 * 24 * 1000));
};

export const compareDates = (dateA, dateB) => {
	if(dateToString(dateA) === dateToString(dateB)) return true;
	return false;
}

// Store

export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const sortByDate = (data) => {
	return data.sort((a, b) => {
		return differenceBetweenDates(a.dateStart, a.dateEnd) - 
		differenceBetweenDates(b.dateStart, b.dateEnd);
	});
}

// Bar lenght

export const calcBarWidthAndColor = (startValue, middleValue, endValue) => {
	let backgroundColor = null;
	const width = (100 - (((middleValue - startValue) * 100) / endValue));
	if(width < 33.33) backgroundColor = "#f44336";
	else if(width < 66.66 && width > 33.33) backgroundColor = "#ff9800";
	else if (width > 66.66) backgroundColor = "#4caf50";

	return {backgroundColor, width};
};