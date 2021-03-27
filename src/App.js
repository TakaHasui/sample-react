import React from 'react';
import PropTypes from 'prop-types';

const App = () => {
  const profiles = [
    {name: 'Hasui', age: 35},
    // {name: 5, age: 28},
    {name: 'Yuki', age: 'NoData'},
    {name: 'Yuki'}
  ]
  return (
    <React.Fragment>
    {
      profiles.map((data, index)=> {
        return <User name={data.name} age={data.age} key={index}/>
      })
    }
    </React.Fragment>
  )
}

const User = (props) => {
  return <div>Hi, {props.name}! {props.age} years old.</div>
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}

export default App;
