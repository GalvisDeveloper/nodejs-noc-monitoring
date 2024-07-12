import { CronService } from '../../../src/presentation/cron/cron-service';


describe('CronService Test', () => {

    const mockTick = jest.fn();

    test('Should create a job', (done) => {
        const job = CronService.createJob('*/1 * * * * *', mockTick);

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);

    })
})