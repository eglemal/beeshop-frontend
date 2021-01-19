import React from 'react';
import {render} from '@testing-library/react';
import ProductsPage from './ProductsPage';

describe('ProductsPage', () => {
    describe('Layout', () => {
        it('has root page div', () => {
            const {queryByTestId} = render (<ProductsPage/>);
            const productsPageDiv = queryByTestId('productspage');
            expect(productsPageDiv).toBeInTheDocument();
        })
    })
})