const User=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const createAccount = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkuser = await User.findOne({ email });
        if (checkuser) {
            return res.status(401).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 12);
        const userdata = await User.create({
            name,
            email,
            password: hashpassword
        });

        const token = await jwt.sign(
            { id: userdata._id },
            process.env.secret_key,
            { expiresIn: "10d" }
        );

        res.status(201).json({
            message: "Account created successfully",
            userdata,
            token
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userdata = await User.findOne({ email });

        if (!userdata) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, userdata.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

       const token = await jwt.sign(
        { id: userdata._id },
        process.env.secret_key,
        { expiresIn: "10d" }
       );

        res.json({
            message: "Welcome back",
            userdata,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports={createAccount,login}