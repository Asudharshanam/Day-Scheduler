import { Toast } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function RandomQuoteGenerator() {
	const [quote, setQuote] = useState<{ text: string; author: string }>();
	const [close, setClose] = useState<boolean>(false);

	async function fetchUserData() {
		const res = await fetch('https://type.fit/api/quotes');
		const data = await res.json();
		const len = data.length;
		const randomId = Math.floor(Math.random() * len);
		setQuote(data[randomId]);
	}

	useEffect(() => {
		fetchUserData();
	}, []);

	if (!quote) return null;

	return (
		<div>
			<Toast
				show={!close}
				onClose={() => setClose(true)}
				style={{
					position: 'fixed',
					top: 15,
					right: 15,
				}}>
				<Toast.Header>
					<strong className='mr-auto'>Quote of the day!</strong>
				</Toast.Header>
				<Toast.Body>
					<p>{quote.text}</p>
					<p className='blockquote-footer float-right'>{quote.author}</p>
				</Toast.Body>
			</Toast>
		</div>
	);
}
