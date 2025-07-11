import {useState} from "react";
import './BookingForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm( { availableTimes, onSubmit, onDateChange }) {
    const [formData, setFormData] = useState({
        date: null,
        time: '',
        name: '',
        email: '',
        phone: '',
        guests: 1,
        occasion: '',
        comments: ''
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // simple validation
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.occasion) newErrors.occasion = 'Occasion is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
        
        setFormData({
            date: null,
            time: '',
            name: '',
            email: '',
            phone: '',
            guests: 1,
            occasion: '',
            comments: ''
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // clear error on change
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date: date,
            time: ''
        }));

        // clear error on change
        if (errors.date || errors.time) {
            setErrors(prev => ({
                ...prev,
                date: '',
                time: ''
            }));
        }

        onDateChange(date);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="booking-form"
            aria-labelledby="booking-form-title"
            noValidate
        >
            <h2 id="booking-form-title">Reserve a Table</h2>

            <div className="form-label">
                <label htmlFor="name">Name *</label>
                <input 
                    name="name" 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    aria-required="true"
                    aria-describedby="name-error"
                />
                {errors.name && (
                    <div id="name-error" aria-live="polite" className="error-message" role="alert">
                        {errors.name}
                    </div>
                )}
            </div>

            <div className="form-label">
                <label htmlFor="email">Email *</label>
                <input 
                    name="email" 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                    aria-required="true"
                    aria-describedby="email-error"
                />
                {errors.email && (
                    <div id="email-error" aria-live="polite" className="error-message" role="alert">
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="form-label">
                <label htmlFor="phone">Phone</label>
                <input 
                    name="phone" 
                    type="tel" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    aria-describedby="phone-help"
                />
                <div id="phone-help" className="help-text">
                    Optional - for reservation confirmation
                </div>
            </div>

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
                    required
                    aria-required="true"
                    aria-describedby="date-help"
                />
                {errors.date && (
                    <div id="date-error" aria-live="polite" className="error-message" role="alert">
                        {errors.date}
                    </div>
                )}
                <div id="date-help" className="help-text">
                    Select your preferred reservation date
                </div>
            </div>

            <div className="form-label">
                <label htmlFor="time">Time *</label>
                <select 
                    name="time" 
                    id="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    required
                    aria-required="true"
                    aria-describedby="time-help"
                >
                    <option value="">Select time</option>
                    {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                {errors.time && (
                    <div id="time-error" aria-live="polite" className="error-message" role="alert">
                        {errors.time}
                    </div>
                )}
                <div id="time-help" className="help-text">
                    {availableTimes.length === 0 ? 
                        "Please select a date first to see available times" : 
                        `${availableTimes.length} time slots available`
                    }
                </div>
            </div>

            <div className="form-label">
                <div className="guests-counter">
                    <label htmlFor="guests">Guests:</label>
                    <span aria-live="polite">{formData.guests}</span>
                </div>
                <input 
                    name="guests" 
                    type="range" 
                    id="guests" 
                    min="1" 
                    max="5" 
                    value={formData.guests} 
                    onChange={handleChange} 
                    required
                    aria-required="true"
                    aria-describedby="guests-help"
                    aria-valuemin="1"
                    aria-valuemax="5"
                    aria-valuenow={formData.guests}
                    aria-valuetext={`${formData.guests} ${formData.guests === 1 ? 'guest' : 'guests'}`}
                />
                <div id="guests-help" className="help-text">
                    Use slider to select number of guests (1-5)
                </div>
            </div>

            <div className="form-label">
                <label htmlFor="occasion">Occasion *</label>
                <select 
                    name="occasion" 
                    id="occasion" 
                    value={formData.occasion} 
                    onChange={handleChange} 
                    required
                    aria-required="true"
                >
                    <option value="">Select occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                    <option value="other">Other</option>
                </select>
                {errors.occasion && (
                    <div id="occasion-error" aria-live="polite" className="error-message" role="alert">
                        {errors.occasion}
                    </div>
                )}
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
                    aria-describedby="comments-help"
                />
                <div id="comments-help" className="help-text">
                    Optional - Let us know about dietary restrictions or special needs
                </div>
            </div>

            <button 
                type="submit"
                aria-describedby="submit-help"
            >
                Make Reservation
            </button>
            <div id="submit-help" className="help-text">
                Submit your reservation request
            </div>
        </form>
    );
}

export default BookingForm;