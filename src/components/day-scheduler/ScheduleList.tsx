import { useState } from 'react';
import { ListStructure, useSchedulerStoreState } from './SchedulerStore';
import ScheduleForm from './ScheduleForm';
import ScheduleListItem from './ScheduleListItem';
import { Tabs, Tab } from 'react-bootstrap';

export default function ScheduleList() {
	const [modalShow, setModalShow] = useState<boolean>(false);
	const [key, setKey] = useState<string>('active');
	const { state } = useSchedulerStoreState();
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
							<ScheduleListItem
								list={list}
								setEditFields={(editedList: ListStructure) =>
									setEditFields(editedList)
								}
								setModalShow={() => setModalShow(true)}
								tab='active'
							/>
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
					{state.deletedScheduleList.map((list) => (
						<ScheduleListItem
							list={list}
							setModalShow={() => setModalShow(true)}
							tab='deleted'
						/>
					))}
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
