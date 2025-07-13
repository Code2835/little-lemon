import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from '../components/BookingForm';

// Mock react-datepicker to allow direct input value change in tests
jest.mock('react-datepicker', () => (props) => (
  <input
    data-testid="mock-datepicker"
    type="text"
    value={props.selected ? props.selected.toISOString().slice(0, 10) : ''}
    onChange={e => props.onChange(new Date(e.target.value))}
    placeholder={props.placeholderText}
    required={props.required}
    aria-required={props['aria-required']}
    aria-describedby={props['aria-describedby']}
    className={props.className}
  />
));

test('Heading exists', () => {
    // Mock the required props
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };

    render(<BookingForm {...mockProps} />);

    const heading = screen.getByText('Reserve a Table');
    expect(heading).toBeInTheDocument();
});

test('Name input has required and type attributes', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('type', 'text');
});

test('Email input has required and type=email', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
});

test('Date input has required', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    const dateInput = screen.getByPlaceholderText(/select a date/i);
    expect(dateInput).toHaveAttribute('required');
});

test('Time select has required', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    const timeSelect = screen.getByLabelText(/time/i);
    expect(timeSelect).toHaveAttribute('required');
});

test('Guests input has type=range, min, max', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    const guestsInput = screen.getByLabelText(/guests/i);
    expect(guestsInput).toHaveAttribute('type', 'range');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '5');
});

test('Form shows error for empty required fields', async () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit: jest.fn(),
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    fireEvent.click(screen.getByText(/make reservation/i));
    await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText(/occasion is required/i)).toBeInTheDocument();
    });
});

test('Form submits with valid data', async () => {
    const onSubmit = jest.fn();
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00'],
        onSubmit,
        onDateChange: jest.fn()
    };
    render(<BookingForm {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'birthday' } });
    // Simulate selecting a valid date using the mocked date picker
    const dateInput = screen.getByTestId('mock-datepicker');
    fireEvent.change(dateInput, { target: { value: '2025-07-13' } });
    // Set time again after date to ensure error clears
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '17:00' } });
    fireEvent.click(screen.getByText(/make reservation/i));
    await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
    });
});