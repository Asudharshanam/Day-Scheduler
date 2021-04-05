import ScheduleList from './ScheduleList';
import GroupPageContextProvider from './SchedulerStore';

export default function DayScheduler() {
	return (
		<GroupPageContextProvider>
			<ScheduleList />
		</GroupPageContextProvider>
	);
}
