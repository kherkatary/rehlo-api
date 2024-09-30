import bcrypt from 'bcrypt';

const hashingPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltRounds);
        return hashedPass;
    } catch (err) {
        console.log(err);
    }
};

const passwordCompare = async (password, hashedPassword) => {
    try {
        const comp = await bcrypt.compare(password, hashedPassword);
        return comp;
    } catch (err) {
        console.log(`Error comparing password: ${err}`);
    }
};

export { hashingPassword, passwordCompare };
