import { Task, MoonlightClient, BasePool } from '../index';
export default class extends Task {
    constructor(client: MoonlightClient, pool: BasePool<string, Task>);
    run(): void;
    init(): void;
}
//# sourceMappingURL=Sweeper.d.ts.map