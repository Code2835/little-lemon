import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reservations from './Reservations';

// Mock the BookingForm component with a simpler approach
jest.mock('../components/BookingForm', () => {
    return function MockBookingForm({ availableTimes, onDateChange, onSubmit }) {
        return (
            <div data-testid="mock-booking-form">
                <input data-testid="mock-datepicker-input" type="text" />
                <select data-testid="mock-time-select">
                    <option value="">Select time</option>
                    {availableTimes && availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <button data-testid="mock-submit-button" onClick={onSubmit}>Submit</button>
                {/* Add test buttons to trigger date changes */}
                <button
                    data-testid="test-workday-button"
                    onClick={() => onDateChange && onDateChange(new Date('2025-07-11'))}
                >
                    Test Workday
                </button>
                <button
                    data-testid="test-weekend-button"
                    onClick={() => onDateChange && onDateChange(new Date('2025-07-12'))}
                >
                    Test Weekend
                </button>
            </div>
        );
    };
});

test('initializeTimes and updateAvailableTimes logic', async () => {
    const workdayHours = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const weekendHours = ["12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

    render(<Reservations />);

    // Check if mock is rendered
    expect(screen.getByTestId('mock-booking-form')).toBeInTheDocument();

    const timeSelect = screen.getByTestId('mock-time-select');
    const getCurrentTimeOptions = () => {
        // eslint-disable-next-line testing-library/no-node-access
        return Array.from(timeSelect.children)
            .filter(option => option.value !== '')
            .map(option => option.textContent);
    };

    // Initial state - should be empty
    expect(getCurrentTimeOptions()).toEqual([]);

    // Test workday
    const workdayButton = screen.getByTestId('test-workday-button');
    await act(async () => {
        workdayButton.click();
    });

    await waitFor(() => {
        expect(getCurrentTimeOptions()).toEqual(workdayHours);
    });

    // Test weekend
    const weekendButton = screen.getByTestId('test-weekend-button');
    await act(async () => {
        weekendButton.click();
    });

    await waitFor(() => {
        expect(getCurrentTimeOptions()).toEqual(weekendHours);
    });
});