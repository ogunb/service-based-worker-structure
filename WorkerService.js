// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./main.worker';

class WorkerService {
    constructor() {
        if (typeof Worker !== 'function') {
            // should be handled.
            throw new Error('Web worker is not supported by this browser.');
        }

        this.worker = new Worker();
    }

    terminate() {
        this.worker.terminate();
    }

    listen() {
        return new Promise((resolve) => {
            this.worker.addEventListener('message', ({ data }) => {
                if (data.hasError) {
                    throw new Error(data.error);
                }

                resolve(data);
            });
        });
    }

    postMessage(dto) {
        const data = this.createWorkerDTO(dto);
        this.worker.postMessage(data);
    }

    createWorkerDTO({
        data,
        eventName,
    }) {
        if (!eventName) throw new Error('Event name cannot be empty.');
        // some other validation to save devs from themselves.

        return {
            data,
            eventName,
        };
    }
}

export default WorkerService;
