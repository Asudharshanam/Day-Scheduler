import ScheduleDate from './ScheduleDate';
import CheckIcon from '../../Icons/CheckIcon';
import EditIcon from '../../Icons/EditIcon';
import moment from 'moment';
import { Card, Button } from 'react-bootstrap';
import { ListStructure, useSchedulerStoreState } from './SchedulerStore';
import TrashIcon from '../../Icons/TrashIcon';
import UndoIcon from '../../Icons/UndoIcon';

interface Props {
	list: ListStructure;
	setEditFields?: (list: ListStructure) => void;
	setModalShow: () => void;
	tab: 'active' | 'deleted' | 'past';
}

export default function ScheduleListItem({
	list,
	setEditFields,
	setModalShow,
	tab,
}: Props) {
	const { dispatch } = useSchedulerStoreState();

	return (
		<Card body className='m-3'>
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<ScheduleDate
							date={moment(list.date).format('MMM DD')}
							time={list.time}
						/>
					</div>
					<div className='col-6'>
						<h6>{list.title}</h6>
						<small className='text-muted'>{list.description}</small>
					</div>
					<div className='col'>
						{tab === 'active' && (
							<>
								<Button
									className='m-2'
									variant='link'
									onClick={() => {
										setEditFields(list);
										setModalShow();
									}}>
									<EditIcon />
								</Button>
								<Button
									className='m-2'
									variant='link'
									onClick={() => dispatch({ type: 'delete', payload: list })}>
									<TrashIcon />
								</Button>
								<Button
									variant='link'
									onClick={() =>
										dispatch({ type: 'completed', payload: list })
									}>
									<CheckIcon color={list.completed ? 'green' : ''} />
								</Button>
							</>
						)}
						{tab === 'deleted' && (
							<>
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
							</>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}
