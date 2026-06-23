import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
__eveDirname(__eveFileURLToPath(import.meta.url));
import { t as dispatchScheduleTask } from "../_libs/eve.mjs";
//#region #eve-schedule-task/eve.schedule.c2NoZWR1bGVzL3dlZWtseS1iYWNrbG9nLWh5Z2llbmUudHM
const config = {
	"appRoot": "/Users/tommaso/personal-projects/evex/packages/agent-registry/agents/linear-operations-agent",
	"dev": false
};
var eve_schedule_default = {
	meta: { description: "Run eve schedule \"weekly-backlog-hygiene\" from \"schedules/weekly-backlog-hygiene.ts\"." },
	async run(event) {
		return { result: await dispatchScheduleTask(event.name, config) };
	}
};
//#endregion
export { eve_schedule_default as default };
