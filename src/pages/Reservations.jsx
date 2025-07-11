import BookingForm from "../components/BookingForm";
import {useReducer } from "react";

const ACTIONS = {
    SET_WEEKEND_TIMES: 'SET_WEEKEND_TIMES',
    SET_WORKDAY_TIMES: 'SET_WORKDAY_TIMES',
    REMOVE_TIME: 'REMOVE_TIME',
    RESET_REMOVED_TIMES: 'RESET_REMOVED_TIMES'
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

        case ACTIONS.REMOVE_TIME:
            return {
                ...state,
                removedTimes: [...state.removedTimes, action.time]
            };

        case ACTIONS.RESET_REMOVED_TIMES:
            return {
                ...state,
                removedTimes: []
            };

        default:
            return state;
    }
};

function Reservations() {
    const initialState = {
        baseTimes: TIME_SLOTS.WORKDAYS,
        removedTimes: []
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const availableTimes = state.baseTimes.filter(
        time => !state.removedTimes.includes(time)
    );

    const handleSubmit = (formData) => {
        console.log('Form submitted:', formData);

        // Здесь можно добавить логику:
        // - Отправка данных на сервер
        // - Обновление доступных времен
        // - Показ уведомления об успешном бронировании

        // Пример: убираем забронированное время
        dispatch({
            type: ACTIONS.REMOVE_TIME,
            date: formData.date,
            time: formData.time,
        });
    }

    // Функция для обновления доступных времен (например, по дате)
    const updateAvailableTimes = (selectedDate) => {
        const isWeekend = selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6);

        if (isWeekend) {
            dispatch({type: ACTIONS.SET_WEEKEND_TIMES});
        } else {
            dispatch({type: ACTIONS.SET_WORKDAY_TIMES});
        }
    };

    return (
        <section className={"reservations-section"}>
            <BookingForm
                availableTimes={availableTimes}
                onSubmit={handleSubmit}
                onDateChange={updateAvailableTimes}
            />
        </section>
    );
}

export default Reservations;