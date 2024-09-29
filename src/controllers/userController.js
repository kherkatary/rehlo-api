import express from 'express';
import crypto from 'crypto';
import userModel from '../models/userModel.js'; // Adjusted for JavaScript
import { hashingPassword, passwordCompare } from '../helper/auth.js'; // Adjusted for JavaScript
import jwt from 'jsonwebtoken';

const Register = async (req, res) => {
    const { name, email, password } = req.body;
    const auth_mail = process.env.AUTH_MAIL;
    const auth_pass = process.env.AUTH_PASS; // Corrected env variable name

    if (!name) return res.status(400).send({ message: "Name required" });
    if (!email) return res.status(400).send({ message: "Email required" });
    if (!password) return res.status(400).send({ message: "Password required" });

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) return res.status(201).send({ message: "Existing user, please login" });

        const hashedPassword = await hashingPassword(password);
        const rand = crypto.randomBytes(10).toString('hex');
        const user = await new userModel({ name: name, password: hashedPassword, email: email, mailCrypto: rand }).save();
        const token = jwt.sign({ id: user._id, email: email }, process.env.SUPER_SECRET_KEY, { expiresIn: "7d" });

        return res.status(200).send({
            message: "User Created",
        });

    } catch (err) {
        return res.status(500).send({
            message: "Error registering",
            error: err
        });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!password) return res.status(400).send({ message: "Password required" });
    if (!email) return res.status(400).send({ message: "Email required" });

    try {
        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(400).send({ message: "User not found, please register first" });

        const compare = await passwordCompare(password, user.password);
        if (!compare) return res.status(400).send({ message: "Password incorrect" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SUPER_SECRET_KEY, { expiresIn: '7d' });

        return res.status(200).send({
            message: "Login successful",
            name: user.name,
            email: user.email,
            token: token
        });

    } catch (err) {
        return res.status(500).send({ message: "Error logging in", error: err });
    }
};

const protectedRoute = async (req, res) => {
    return res.send("Hello, I am a protected route");
};

const verifyEmail = async (req, res) => {
    const id = req.params.id;
    const verifiedCrypto = req.params.slug;

    try {
        const user = await userModel.findById(id);
        if (!user) return res.status(500).send("Couldn't find user");

        if (verifiedCrypto !== user.mailCrypto) {
            await userModel.findByIdAndDelete(id, (err) => {
                if (!err) return res.status(500).send({
                    message: "Token unmatched, user deleted",
                });
            });
            return res.status(300).send("Verification failed, token unmatched");
        }

        await userModel.findByIdAndUpdate(id, { isMailVerified: true });
        return res.status(200).send("Email verified, thank you");

    } catch (err) {
        return res.status(500).send({
            message: "Error in email verification process",
            error: err
        });
    }
};

export { Register, Login, protectedRoute, verifyEmail };
