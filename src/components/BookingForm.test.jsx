import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from '../components/BookingForm';

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