import React from 'react';
import MenuBar from './MenuBar';
import { create, update } from 'react-test-renderer';

describe('My first snapshot test', () => {
    test('testing MenuBar snapshot', () => {
        let tree = create(<MenuBar />)
        expect(tree.toJSON()).toMatchSnapshot();
    })
})

describe('Change the activeMenuBarOption value', () => {
    test('testing MenuBar snapshot', () => {
        let tree = create(<MenuBar />)
        let instance = tree.getInstance();
        expect(instance.state.activeMenuBarOption).toBe(null);
        instance.setActiveMenuBarOption('Link text');
        expect(instance.state.activeMenuBarOption).toBe('Link text');
        expect(tree.toJSON()).toMatchSnapshot();

    })
})
