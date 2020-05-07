import WorkerService from '.';

export default class WorkerPublisher {
    constructor() {
        this.worker = new WorkerService();
        this.EVENT_NAME = null;
    }

    handler(data) {
        if (this.EVENT_NAME === null) {
            throw new Error('EVENT_NAME is required on this instance.');
        }

        this.worker.postMessage({
            eventName: this.EVENT_NAME,
            data,
        });
    }

    listen() {
        return this.worker.listen();
    }
}
