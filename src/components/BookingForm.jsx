import {useState} from "react";
import './BookingForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Добавляем импорт стилей

function BookingForm( { availableTimes, onSubmit, onDateChange }) {
    const [formData, setFormData] = useState({
        date: null, // Меняем на null для DatePicker
        time: '',
        guests: 1,
        occasion: '',
        comments: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Передаем данные в родительский компонент
        onSubmit(formData);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date: date
        }));

        // Уведомляем родительский компонент об изменении даты
        if (onDateChange) {
            onDateChange(date);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <h2>Reserve a Table</h2>

            <div className="form-label">
                <label htmlFor="date">Date *</label>
                <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a date"
                    className="date-picker-input"
                    wrapperClassName="date-picker-wrapper"
                    // calendarClassName="date-picker-calendar"
                    required
                />
            </div>

            <div className="form-label">
                <label htmlFor="time">Time *</label>
                <select name="time" id="time" value={formData.time} onChange={handleChange} required>
                    <option value="">Select time</option>
                    {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>

            <div className="form-label">
                <div className="guests-counter">
                    <label htmlFor="guests">Guests:</label>
                    <span>{formData.guests}</span>
                </div>
                <input name="guests" type="range" id="guests" min="1" max="5" value={formData.guests} onChange={handleChange} required/>
            </div>

            <div className="form-label">
                <label htmlFor="occasion">Occasion *</label>
                <select name="occasion" id="occasion" value={formData.occasion} onChange={handleChange} required>
                    <option value="">Select occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-label">
                <label htmlFor="comments">Special Requests</label>
                <textarea
                    name="comments"
                    id="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Any special requests or dietary requirements?"
                    rows="5"
                />
            </div>

            <button type="submit">Make Reservation</button>
        </form>
    )
}

export default BookingForm;