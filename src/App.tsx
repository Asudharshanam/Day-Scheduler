import DayScheduler from './components/day-scheduler/index';
import RandomQuoteGenerator from './components/RandomQuoteGenerator';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<div className='m-5 container'>
					<RandomQuoteGenerator />
					<DayScheduler />
				</div>
			</header>
		</div>
	);
}

export default App;
