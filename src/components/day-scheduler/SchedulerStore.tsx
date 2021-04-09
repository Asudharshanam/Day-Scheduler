import React, { useReducer, createContext, useContext } from 'react';
import { Moment } from 'moment';

export interface ListStructure {
	id: number;
	completed: boolean;
	title: string;
	description: string;
	date: Moment;
	time: string;
}

export interface initialStateType {
	scheduleList: ListStructure[];
	deletedScheduleList: ListStructure[];
}

export const initialState = {
	scheduleList: [],
	deletedScheduleList: [],
};

function reducer(state: initialStateType, action: any) {
	switch (action.type) {
		case 'add': {
			return {
				...state,
				scheduleList: [...state.scheduleList, action.payload],
			};
		}

		case 'edit': {
			return {
				...state,
				scheduleList: state.scheduleList.map((list) => {
					if (list.id === action.payload.id) {
						return action.payload;
					} else {
						return list;
					}
				}),
			};
		}

		case 'completed': {
			return {
				...state,
				scheduleList: state.scheduleList.map((list) => {
					if (list.id === action.payload.id) {
						return {
							...list,
							completed: true,
						};
					} else {
						return list;
					}
				}),
			};
		}

		case 'delete': {
			return {
				...state,
				scheduleList: state.scheduleList.filter(
					(list) => list.id !== action.payload.id
				),
				deletedScheduleList: [...state.deletedScheduleList, action.payload],
			};
		}

		case 'undo_delete': {
			return {
				...state,
				scheduleList: [...state.scheduleList, action.payload],
				deletedScheduleList: state.deletedScheduleList.filter(
					(list) => list.id !== action.payload.id
				),
			};
		}

		case 'delete_forever': {
			return {
				...state,
				deletedScheduleList: state.deletedScheduleList.filter(
					(list) => list.id !== action.payload.id
				),
			};
		}

		default:
			return state;
	}
}

interface ContextType {
	state: { scheduleList: []; deletedScheduleList: [] };
	dispatch: React.Dispatch<any>;
}

export const GroupPageContext = createContext(null);
export default function SchedulerStoreContextProvider({
	children,
}: {
	children: React.ReactComponentElement<
		any,
		Pick<any, string | number | symbol>
	>;
}): JSX.Element {
	const [state, dispatch] = useReducer(
		reducer,
		initialState as initialStateType
	);

	return (
		<GroupPageContext.Provider value={{ state, dispatch } as ContextType}>
			{children}
		</GroupPageContext.Provider>
	);
}

export function useSchedulerStoreState() {
	const context = useContext(GroupPageContext);
	if (!context) {
		throw new Error(
			'useSchedulerStoreState must be used within the AppStateProvider'
		);
	}
	const {
		state,
		dispatch,
	}: { state: initialStateType; dispatch: any } = context;
	return { state, dispatch };
}
