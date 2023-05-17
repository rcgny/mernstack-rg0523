import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import Cart from  '../../models/Cart'
import bcrypt from 'bcrypt' // password hashing lib
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

connectDb()

export default async (req, res) => {
	const { name, email, password } = req.body
	try {
		// 0) Validate name/email/password values
		// name 3 - 10 chars
		if (!isLength(name, { min: 3, max: 10 })) {
			return res.status(422).send('name must be 3-10 chars long')
		} else if (!isLength(password, {min:6})){
            return res.status(422).send('password must be at least 6 chars long')
        }
        else if (!isEmail(email)){
            return res.status(422).send('email must be valid')
        }
		// 1) Check to see if the user already exists in the db
		const user = await User.findOne({ email })
		if (user) {
			return res.status(422).send(`User already exists with email ${email}`)
		}
		// 2) --if user not yet in db, hash their password
		const hash = await bcrypt.hash(password, 10)
		// 3) create user
		const newUser = await new User({
			name,
			email,
			password: hash, // Setting the password to the hashed value
		}).save()

		console.log({ newUser })
		// 4)  create a cart for the new user
         await new Cart({ user: newUser._id}).save()
		// 5) create token for the new user
		const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		})
		// 6) send back token
		res.status(201).json(token)
	} catch (error) {
		console.error(error)
		res.status(500).send('Error signing up user. Please try again later')
	}
}
