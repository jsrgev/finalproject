import React, {	useState } from "react";
import DatePicker from "react-datepicker";
import { isSameDay } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

// some of below adapted from https://github.com/Hacker0x01/react-datepicker/pull/1718, to block out past times on current day

const DateInput = ({changeDateDue}) => {
	const [startDate, setStartDate] = useState();
	const isSelectedDateInFuture = !isSameDay(startDate, new Date());

	// let minTimeHour = new Date().getHours();
	// if (!isSelectedDateToday) {minTimeHour = 0};

	const date = new Date();
	let currentMins = date.getMinutes();
	let currentHour = date.getHours();
	if (isSelectedDateInFuture) {
		currentHour = 0;
		currentMins = 0;
	}
	const handleChange = (date) => {
		setStartDate(date);
		changeDateDue(date);
		};

	return (
		< DatePicker
		showTimeSelect
		selected = { startDate }
		onChange = { (date) => handleChange(date) }
		dateFormat = "dd/MM/yyyy h:mm aa"
		minDate = { new Date() }
		minTime = { new Date(new Date().setHours(currentHour, currentMins, 0, 0)) }
		maxTime = { new Date(new Date().setHours(23, 59, 0, 0)) }
		placeholderText = "Finish By" / >
	);



};

export default DateInput;