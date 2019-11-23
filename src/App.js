import React from 'react';
import Game from "./components/Game"

class App extends React.Component {
	render() {
		  return (
		    <div className="App" style={{marginTop: 50, marginLeft: 200}}>
		     	<Game />
		    </div>
		  );
		}

	}

export default App;
