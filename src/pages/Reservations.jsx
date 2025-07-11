import BookingForm from "../components/BookingForm";
import {useReducer } from "react";

const ACTIONS = {
    ADD_BOOKING: 'ADD_BOOKING',
    SET_WEEKEND_TIMES: 'SET_WEEKEND_TIMES',
    SET_WORKDAY_TIMES: 'SET_WORKDAY_TIMES',
    SET_SELECTED_DATE: 'SET_SELECTED_DATE'
};

const TIME_SLOTS = {
    WEEKEND: [
        "12:00", "13:00", "14:00", "17:00",
        "18:00", "19:00", "20:00", "21:00",
        "22:00", "23:00"
    ],
    WORKDAYS: [
        "17:00", "18:00", "19:00",
        "20:00", "21:00", "22:00"
    ]
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_BOOKING:
            const newBookingDate = new Date(action.bookingData.date);
            const [hours, minutes] = action.bookingData.time.split(':').map(Number);
            newBookingDate.setHours(hours, minutes, 0, 0);

            return {
                ...state,
                bookedDates: [
                    ...state.bookedDates, 
                    {
                        ...action.bookingData,
                        date: newBookingDate,
                        id: Date.now(),
                        status: 'confirmed'
                    }
                ]
            };

        case ACTIONS.SET_WEEKEND_TIMES:
            return {
                ...state,
                baseTimes: TIME_SLOTS.WEEKEND
            };

        case ACTIONS.SET_WORKDAY_TIMES:
            return {
                ...state,
                baseTimes: TIME_SLOTS.WORKDAYS
            };

        case ACTIONS.SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: action.date
            };

        default:
            return state;
    }
};

function Reservations() {
    const initialState = {
        bookedDates: [],
        selectedDate: null,
        baseTimes: TIME_SLOTS.WORKDAYS,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const getAvailableTimes = () => {
        if (!state.selectedDate) return []; // null protection
        
        const bookedTimes = state.bookedDates
            .filter(booking => 
                booking.date && 
                booking.date.toDateString() === state.selectedDate.toDateString()
            )
            .map(booking => booking.time);

        return state.baseTimes.filter(time => !bookedTimes.includes(time));
    };

    const handleSubmit = (formData) => {
        console.log('Form submitted:', formData);

        dispatch({
            type: ACTIONS.ADD_BOOKING,
            bookingData: formData
        });
    };

    const updateAvailableTimes = (selectedDate) => {
        dispatch({
            type: ACTIONS.SET_SELECTED_DATE,
            date: selectedDate
        });

        if (!state.selectedDate) return []; // null protection

        const isWeekend = selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6);

        if (isWeekend) {
            dispatch({type: ACTIONS.SET_WEEKEND_TIMES});
        } else {
            dispatch({type: ACTIONS.SET_WORKDAY_TIMES});
        }
    };

    return (
        <section 
            className="reservations-section" 
            aria-labelledby="reservations-heading"
            role="main"
        >
            <h1 id="reservations-heading" className="visually-hidden">
                Table Reservations
            </h1>
            <BookingForm
                availableTimes={getAvailableTimes()}
                onSubmit={handleSubmit}
                onDateChange={updateAvailableTimes}
            />
        </section>
    );
}

export default Reservations;