'use strict'

import User from '../user/user.model.js'
import Publication from '../publication/publication.model.js'
import Comment from './comment.model.js'

export const test = async(req, res)=>{
    return res.send({message: 'COMMENT | Function test'})
}

export const comment = async(req, res)=>{
    try {
        let data = req.body
        let user = await User.findOne({_id: data.user})
        if(!user)return res.status(404).send({message: 'User not found'})
        let publication = await Publication.findOne({_id: data.publication})
        if(!publication) return res.status(400).send({message: 'Publication not found'})
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: 'Commented successfuly !!'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error at comment publication'})
    }
}

export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let updatedComment = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user',['username'])
        if(!updatedComment)return res.status(404).send({message: 'Publication or user not found, not updated'})
        return res.send({message: 'Comment uodated successfuly !!', updatedComment})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error at updating comment'})
    }
}
