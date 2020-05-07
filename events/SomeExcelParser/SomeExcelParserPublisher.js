import WorkerPublisher from '../../WorkerPublisher';
import { SOME_EXCEL } from '../../events';

class SomeExcelParserPublisher extends WorkerPublisher {
    constructor() {
        super();

        this.EVENT_NAME = SOME_EXCEL;
    }
}

const someExcelParserService = new SomeExcelParserPublisher();
export default someExcelParserService;
