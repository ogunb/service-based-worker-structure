import someExcelParserHandler from './events/SomeExcelParser/SomeExcelParserHandler';
import { SOME_EXCEL } from './events';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', async ({ data: { eventName, data } }) => {
    let returnValue = null;

    try {
        switch (eventName) {
        case SOME_EXCEL:
            returnValue = await someExcelParserHandler(data);
            break;
        default:
            console.error(`No handler was defined on worker for ${eventName}.`);
        }
    } catch (error) {
        returnValue = {
            hasError: true,
            error,
        };
    }

    postMessage({ value: returnValue, hasError: false });
});
