import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useGroupPageState, ListStructure } from './SchedulerStore';

interface Props {
	show: boolean;
	onHide: () => void;
	editFields: ListStructure;
}

export interface FormValue {
	title: string;
	description: string;
}

export default function ScheduleForm({ show, onHide, editFields }: Props) {
	const { dispatch } = useGroupPageState();
	const [formValue, setFormValues] = useState<FormValue>({
		title: '',
		description: '',
	});

	useEffect(() => {
		if (editFields?.id) {
			setFormValues({
				title: editFields.title,
				description: editFields.description,
			});
		}
	}, [editFields]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValue, [name]: value });
	};

	const onAdd = () => {
		if (!formValue.title) {
			setFormValues({
				title: '',
				description: '',
			});
			onHide();
		} else if (editFields?.id) {
			dispatch({
				type: 'edit',
				payload: {
					id: editFields.id,
					title: formValue.title,
					description: formValue.description,
					completed: editFields.completed,
				},
			});
		} else {
			dispatch({
				type: 'add',
				payload: {
					id: Date.now(),
					title: formValue.title,
					description: formValue.description,
					completed: false,
				},
			});
		}
		setFormValues({
			title: '',
			description: '',
		});
		onHide();
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Modal heading
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
