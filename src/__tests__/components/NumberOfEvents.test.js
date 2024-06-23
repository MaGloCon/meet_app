import { render } from '@testing-library/react';
import NumberOfEvents from '../../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    
    beforeEach(() => {
       NumberOfEventsComponent = render(
       <NumberOfEvents 
         setCurrentNumberOfEvents={jest.fn()} 
         setErrorAlert={() => { }}
        />
       );
    });

     test('renders number of events text input', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toBeInTheDocument();
        expect(numberTextBox).toHaveClass('number-of-events-input');
    });

    test('default value of the input field is 32', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toHaveValue('32');
    });

    test('value changes accordingly when user types', async() => {
        const user = userEvent.setup();
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        await user.type(numberTextBox, '{backspace}{backspace}10');
        expect(numberTextBox).toHaveValue('10');
    });
})

