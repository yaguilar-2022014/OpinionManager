'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('USER | Function test')
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({ message: 'Registered Successfully !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        let { username, email, password } = req.body
        let user = await User.findOne({ $or: [{ username }, { email }] })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                email: user.email
            }
            let token = await generateJwt(loggedUser)
            return res.send({ message: `Welcome ${user.name}`, loggedUser, token })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}



export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body

        //Find user by Id
        let user = await User.findById(id)
        if(!user)return res.status(401).send({message: 'User not found'})

        if(data.newPassword && !await checkPassword(data.password, user.password))return res.status(401).send({message: 'Incorrect password'})
        if(data.password && data.newPassword){
            data.password = await encrypt(data.newPassword)
            let updatePassword = await User.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
                )
                console.log(data.password)
                return res.send({message: updatePassword})
        }else{
            let updatedUser = await User.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
            )
            if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
            return res.send({ message: 'Updated user', updatedUser})
        }

    } catch (err) {
        console.error(err)
        if(err.keyvalue.username) return res.status(400).send({message: `Username ${err.keyvalue.username} is already taken`})
        return res.status(500).send({ message: 'Error updating account' })
    }
}
