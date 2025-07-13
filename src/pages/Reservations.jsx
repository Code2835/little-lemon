// /* global fetchAPI, submitAPI */
import BookingForm from "../components/BookingForm";
import {useEffect, useReducer} from "react";
import { fetchAPI, submitAPI } from "../utils/api";
import {useNavigate} from 'react-router-dom';

const ACTIONS = {
    ADD_BOOKING: 'ADD_BOOKING',
    SET_WEEKEND_TIMES: 'SET_WEEKEND_TIMES',
    SET_WORKDAY_TIMES: 'SET_WORKDAY_TIMES',
    SET_FROM_FETCH_API: 'SET_FROM_FETCH_API',
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

        case ACTIONS.SET_FROM_FETCH_API:
            return {
                ...state,
                baseTimes: action.times
            };

        default:
            return state;
    }
};

function Reservations() {
    const navigate = useNavigate();
    const today = new Date();

    const initialState = {
        bookedDates: (()=>{
            const storedDates = localStorage.getItem("bookingData");
            if (storedDates && storedDates.length > 0){
                return JSON.parse(storedDates).map(booking => ({
                    ...booking,
                    date: typeof booking.date === "string" ? new Date(booking.date) : booking.date,
                }));
            }
            return [];
        })(), // IIFE - Immediately Invoked Function Expression
        selectedDate: today,
        baseTimes: TIME_SLOTS.WORKDAYS,
        // apiLoaded: false
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

        // without fetchAPI
        dispatch({
            type: ACTIONS.ADD_BOOKING,
            bookingData: formData
        });

        // with submitAPI
        const submitted = submitAPI(formData);
        console.log('API submission result:', submitted);
        
        if (submitted) {
            navigate('/confirmed');
        }
    };

    const updateAvailableTimes = (selectedDate) => {
        dispatch({
            type: ACTIONS.SET_SELECTED_DATE,
            date: selectedDate
        });

        if (!selectedDate) return []; // null protection

        // without fetchAPI
        // const isWeekend = selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6);
        //
        // if (isWeekend) {
        //     dispatch({type: ACTIONS.SET_WEEKEND_TIMES});
        // } else {
        //     dispatch({type: ACTIONS.SET_WORKDAY_TIMES});
        // }

        // with fetchAPI
        const times = fetchAPI(selectedDate);
        console.log('API times:', times);

        dispatch( {
            type: times && Array.isArray(times) ? ACTIONS.SET_FROM_FETCH_API : ACTIONS.SET_WORKDAY_TIMES,
            times: times
        } );
    };

    // local storage
    useEffect(() => {
        localStorage.setItem('bookingData', JSON.stringify(state.bookedDates));
    }, [state.bookedDates]);

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