import BookingForm from './BookingForm';

export default {
    title: 'Components/BookingForm',
    component: BookingForm,
    parameters: {
        layout: 'centered',
    },
};

// Mock data and functions for the stories
const mockAvailableTimes = [
    "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

const mockOnSubmit = (formData) => {
    console.log('Form submitted:', formData);
};

const mockOnDateChange = (date) => {
    console.log('Date changed:', date);
};

export const Default = {
    args: {
        availableTimes: mockAvailableTimes,
        onSubmit: mockOnSubmit,
        onDateChange: mockOnDateChange,
    },
};

export const WithInitialData = {
    args: {
        availableTimes: mockAvailableTimes,
        onSubmit: mockOnSubmit,
        onDateChange: mockOnDateChange,
    },
    render: (args) => {
        return <BookingForm {...args} />;
    },
};

export const WeekendTimes = {
    args: {
        availableTimes: [
            "12:00", "13:00", "14:00", "17:00",
            "18:00", "19:00", "20:00", "21:00",
            "22:00", "23:00"
        ],
        onSubmit: mockOnSubmit,
        onDateChange: mockOnDateChange,
    },
};

export const MobileView = {
    args: {
        availableTimes: mockAvailableTimes,
        onSubmit: mockOnSubmit,
        onDateChange: mockOnDateChange,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};