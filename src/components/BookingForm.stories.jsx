import BookingForm from './BookingForm';

export default {
  title: 'Components/BookingForm',
  component: BookingForm,
    parameters: {
        layout: 'centered',
    },
};

export const Default = {
    args: {},
};

export const WithInitialData = {
    args: {},
    render: () => {
        // Можно показать форму с предзаполненными данными
        return <BookingForm />;
    },
};

export const MobileView = {
    args: {},
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
