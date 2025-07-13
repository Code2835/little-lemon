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
        bookedDates: [],
        selectedDate: today,
        baseTimes: TIME_SLOTS.WORKDAYS,
        // apiLoaded: false
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    // // Функции для сохранения API в память
    // let fetchAPI = null;
    // let submitAPI = null;
    //
    // const loadAPIFunctions = async () => {
    //     try {
    //         // Загружаем JavaScript файл как текст
    //         const response = await fetch('https://raw.githubusercontent.com/courseraap/capstone/main/api.js');
    //         const scriptText = await response.text();
    //
    //         // Создаем новый скрипт элемент и выполняем код
    //         const script = document.createElement('script');
    //         script.textContent = scriptText;
    //         document.head.appendChild(script);
    //
    //         // Сохраняем функции в локальные переменные
    //         if (window.fetchAPI && window.submitAPI) {
    //             fetchAPI = window.fetchAPI;
    //             submitAPI = window.submitAPI;
    //             console.log('API functions loaded successfully');
    //
    //             // Обновляем состояние
    //             dispatch({
    //                 type: 'SET_API_LOADED',
    //                 loaded: true
    //             });
    //         } else {
    //             console.error('API functions not found in loaded script');
    //         }
    //
    //     } catch (error) {
    //         console.error('Error loading API functions:', error);
    //     }
    // };

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

        // if (window.submitAPI) {
        //     try {
        //         const submitted = window.submitAPI(formData);
        //         console.log('API submission result:', submitted);
        //     } catch (error) {
        //         console.error('Error submitting via API:', error);
        //     }
        // } else {
        //     console.warn('submitAPI not loaded yet');
        // }
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

        // try {
        //     const times = window.fetchAPI(selectedDate);
        //     console.log('API times:', times);
        //
        //     if (times && Array.isArray(times)) {
        //         dispatch({
        //             type: ACTIONS.SET_FROM_FETCH_API,
        //             times: times
        //         });
        //     } else {
        //         // Fallback к стандартным временам
        //         const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
        //         dispatch({
        //             type: isWeekend ? ACTIONS.SET_WEEKEND_TIMES : ACTIONS.SET_WORKDAY_TIMES
        //         });
        //     }
        // } catch (error) {
        //     console.error('Error fetching times:', error);
        //     // Fallback в случае ошибки
        //     const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
        //     dispatch({
        //         type: isWeekend ? ACTIONS.SET_WEEKEND_TIMES : ACTIONS.SET_WORKDAY_TIMES
        //     });
        // }

        // // with fetchAPI
        // if (window.fetchAPI) {
        //     try {
        //         const times = window.fetchAPI(selectedDate);
        //         console.log('API times:', times);
        //
        //         if (times && Array.isArray(times)) {
        //             dispatch({
        //                 type: ACTIONS.SET_FROM_FETCH_API,
        //                 times: times
        //             });
        //         } else {
        //             // Fallback к стандартным временам
        //             const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
        //             dispatch({
        //                 type: isWeekend ? ACTIONS.SET_WEEKEND_TIMES : ACTIONS.SET_WORKDAY_TIMES
        //             });
        //         }
        //     } catch (error) {
        //         console.error('Error fetching times:', error);
        //         // Fallback в случае ошибки
        //         const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
        //         dispatch({
        //             type: isWeekend ? ACTIONS.SET_WEEKEND_TIMES : ACTIONS.SET_WORKDAY_TIMES
        //         });
        //     }
        // } else {
        //     // Fallback без API
        //     const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
        //     dispatch({
        //         type: isWeekend ? ACTIONS.SET_WEEKEND_TIMES : ACTIONS.SET_WORKDAY_TIMES
        //     });
        // }
    };

    // with fetchAPI
    // const fetchData = () => {
    //     fetch(`https://raw.githubusercontent.com/courseraap/capstone/main/api.js`)
    //         .then((response) => response.json())
    //         .then((jsonData) => setBtcData(jsonData.bpi.USD))
    //         .catch((error) => console.log(error));
    // };
    //
    // useEffect(() => {
    //     fetchData();
    // }, []);

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