const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('Initial one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        let passwordHash = await bcrypt.hash('secret', 10);

        const user = new User({
            username: 'root',
            passwordHash: passwordHash
        })
        const savedUser = await user.save();
    });

    test('creation succeded with a fresh user', async () => {
        
    });
});