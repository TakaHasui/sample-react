import React from 'react';

// class App extends Component {
//   render () {
//     return (
//       <React.Fragment>
//         <label htmlFor="test">bar</label>
//         <input type="text" onClick={() => {console.log("Clicked! console ")}} />
//       </React.Fragment>
//     )
//   }
// }

const App = () => {
  const profiles = [
    {name: 'Hasui'},
    {name: 'Yuki', age: 28}
  ]
  return (
    <React.Fragment>
    Hi!
    <User name={"Hassan"} />
    <User name={"Hassan"} age={36} />
    <User name={"Yuki"} age={35} />
    <Cat />
    {
      profiles.map((data, index)=> {
        return <User name={data.name} age={data.age} key={index}/>
      })
    }
    </React.Fragment>
  )
}

const Cat = () => {
  return <div>Meow!</div>
}
const User = (props) => {
  return <div>Hi, {props.name}! {props.age} years old.</div>
}

User.defaultProps = {
  age: 17
}

export default App;
