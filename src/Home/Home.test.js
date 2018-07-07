import * as firebase from 'firebase';
import Home from "./Home";
import {shallow} from 'enzyme';
import React    from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


// test('Expects to sign out completely', () => {
    
//     const user = firebase.auth().currentUser;
//     const wrapper = shallow(<Home />);

//     expect(wrapper.instance().signOut()).toBeNull;
// })

test('adds',() => {
    expect(sum(1, 2)).toBe(3);
})
