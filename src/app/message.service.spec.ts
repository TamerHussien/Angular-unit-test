import { MessageService } from './message.service';

describe(`Message service`, () => {
    let service: MessageService;
    beforeEach(() => {
    });
    it(`should have no message to start`, () => {
        // Arrange
        service = new MessageService();

        // Act

        // Assert
        expect(service.messages.length).toBe(0);
    });

    it(`should add a message when add is called`, () => {
            // Arrange
            service = new MessageService();

            // Act
            service.add('MSG 1');

            // Assert
            expect(service.messages.length).toBe(1);
    });

    it(`should remove all Messages when clear is called `, () => {
            // Arrange
            service = new MessageService();
            service.add('MSG 1');

            // Act
            service.clear();
            // Assert
            expect(service.messages.length).toBe(0);
    });
});
