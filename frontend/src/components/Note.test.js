
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import Note from './Note';

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: false
    }
    const { container } = render(<Note note={ note }/>);

    const div = container.querySelector('.note');

    // const element = screen.getByText('Component testing is done with react-testing-library');

    screen.debug(div);
    expect(div).toHaveTextContent(
        `Component testing is done with react-testing-library`
    );
})