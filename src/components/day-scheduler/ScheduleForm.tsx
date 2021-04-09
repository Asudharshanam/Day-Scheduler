import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSchedulerStoreState, ListStructure } from './SchedulerStore';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment, { Moment } from 'moment';
import CalenderIcon from '../../Icons/CalenderIcon';
interface Props {
	show: boolean;
	onHide: () => void;
	editFields: ListStructure;
}

export interface FormValue {
	title: string;
	description: string;
	time: any;
}

export default function ScheduleForm({ show, onHide, editFields }: Props) {
	const { dispatch } = useSchedulerStoreState();
	const [selectedDate, setSelectedDate] = useState<Moment>(moment());
	const [clientAddDateFocus, setClientAddDateFocus] = useState<boolean>(false);

	const [formValue, setFormValues] = useState<FormValue>({
		title: '',
		description: '',
		time: moment().format('hh:mm'),
	});

	useEffect(() => {
		if (editFields?.id) {
			setFormValues({
				title: editFields.title,
				description: editFields.description,
				time: editFields.time,
			});
			setSelectedDate(editFields.date);
		}
	}, [editFields]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValue, [name]: value });
	};

	const defaultState = () => {
		setFormValues({
			title: '',
			description: '',
			time: '',
		});
		setSelectedDate(moment());
		onHide();
	};

	const onAdd = () => {
		if (!formValue.title) {
			defaultState();
		} else if (editFields?.id) {
			dispatch({
				type: 'edit',
				payload: {
					id: editFields.id,
					title: formValue.title,
					description: formValue.description,
					date: selectedDate,
					completed: editFields.completed,
					time: formValue.time,
				},
			});
		} else {
			dispatch({
				type: 'add',
				payload: {
					id: Date.now(),
					title: formValue.title,
					description: formValue.description,
					date: selectedDate,
					completed: false,
					time: formValue.time,
				},
			});
		}
		defaultState();
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Add Schedule
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<div className='mb-3'>
						<label htmlFor='exampleFormControlInput1' className='form-label'>
							Title
						</label>
						<input
							name='title'
							className='form-control'
							value={formValue.title}
							onChange={handleChange}
						/>
						<div className='d-flex mt-3'>
							<label className='form-label mt-1'>Date</label>
							<div className='ml-2'>
								<SingleDatePicker
									numberOfMonths={1}
									minDate={moment().subtract(1, 'days')}
									date={selectedDate}
									onDateChange={(dateInput) =>
										setSelectedDate(dateInput || moment())
									}
									focused={clientAddDateFocus}
									onFocusChange={({ focused }) =>
										setClientAddDateFocus(!!focused)
									}
									id='your_unique_id'
									small
									customInputIcon={<CalenderIcon />}
								/>
							</div>
							<label className='form-label mt-1 ml-3'>Time</label>
							<input
								onChange={handleChange}
								value={formValue.time}
								style={{ maxWidth: 150 }}
								type='time'
								name='time'
								className='form-control ml-2'
							/>
						</div>
					</div>
					<div className='mb-3'>
						<label className='form-label'>Description</label>
						<textarea
							name='description'
							className='form-control'
							rows={3}
							value={formValue.description}
							onChange={handleChange}
						/>
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
				<Button onClick={onAdd}>{editFields?.id ? 'Update' : 'Add'}</Button>
			</Modal.Footer>
		</Modal>
	);
}
