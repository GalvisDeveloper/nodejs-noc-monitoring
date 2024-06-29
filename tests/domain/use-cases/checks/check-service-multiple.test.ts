import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple';

describe('Check Service UseCase', () => {

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const mockRepository = [{
        saveLogs: jest.fn(),
        getLogs: jest.fn()
    }]

    const checkService = new CheckServiceMultiple(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('http://www.google.com');
        expect(wasOk).toBe(true);

        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        mockRepository.forEach(element => {
            expect(element.saveLogs).toHaveBeenCalledWith(
                expect.any(LogEntity)
            )
        });

    });

    test('Should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute('http://www.qweqwretrygoogle.com');
        expect(wasOk).toBe(false);

        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        mockRepository.forEach(element => {
            expect(element.saveLogs).toHaveBeenCalledWith(
                expect.any(LogEntity)
            )
        });

    });

})