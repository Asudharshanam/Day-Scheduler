import { useState } from 'react';
import { ListStructure, useGroupPageState } from './SchedulerStore';
import ScheduleForm from './ScheduleForm';
import { Card, Tabs, Tab, Button } from 'react-bootstrap';
import TrashIcon from '../../Icons/TrashIcon';
import CheckIcon from '../../Icons/CheckIcon';
import UndoIcon from '../../Icons/UndoIcon';
import EditIcon from '../../Icons/EditIcon';

export default function ScheduleList() {
	const [modalShow, setModalShow] = useState<boolean>(false);
	const [key, setKey] = useState<string>('active');
	const { state, dispatch } = useGroupPageState();
	const [editFields, setEditFields] = useState<ListStructure>();

	return (
		<>
			<Tabs
				id='controlled-tab-example'
				activeKey={key}
				onSelect={(k) => setKey(k)}>
				<Tab eventKey='active' title='Active'>
					{state.scheduleList.map((list) => {
						return (
							<Card body className='m-3'>
								<div className='d-flex justify-content-between'>
									<div>
										<h6>{list.title}</h6>
										<small className='text-muted'>{list.description}</small>
									</div>
									<div>
										<Button
											className='m-2'
											variant='link'
											onClick={() => {
												setEditFields(list);
												setModalShow(true);
											}}>
											<EditIcon />
										</Button>
										<Button
											className='m-2'
											variant='link'
											onClick={() =>
												dispatch({ type: 'delete', payload: list })
											}>
											<TrashIcon />
										</Button>
										<Button
											variant='link'
											onClick={() =>
												dispatch({ type: 'completed', payload: list })
											}>
											<CheckIcon color={list.completed ? 'green' : ''} />
										</Button>
									</div>
								</div>
							</Card>
						);
					})}
					<button
						type='button'
						className={`btn btn-primary float-right ${
							state.scheduleList.length ? '' : 'mt-3'
						}`}
						onClick={() => setModalShow(true)}>
						Add Schedule +
					</button>
				</Tab>
				<Tab eventKey='past' title='Past'>
					<p>Past</p>
				</Tab>
				<Tab eventKey='deleted' title='Deleted'>
					{state.deletedScheduleList.map((list) => {
						return (
							<Card body className='m-3'>
								<div className='d-flex justify-content-between'>
									<div>
										<h6>{list.title}</h6>
										<small className='text-muted'>{list.description}</small>
									</div>
									<div>
										<Button
											className='m-2'
											variant='link'
											onClick={() =>
												dispatch({ type: 'undo_delete', payload: list })
											}>
											<UndoIcon />
										</Button>
										<Button
											className='m-2'
											variant='link'
											onClick={() =>
												dispatch({ type: 'delete_forever', payload: list })
											}>
											<TrashIcon />
										</Button>
									</div>
								</div>
							</Card>
						);
					})}
				</Tab>
			</Tabs>
			<ScheduleForm
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					setEditFields(null);
				}}
				editFields={editFields}
			/>
		</>
	);
}
