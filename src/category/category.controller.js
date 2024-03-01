'use strict'

import Category from './category.model.js'

export const test = (req, res) => {
    return res.send({ message: 'CATEGORY | Fucntion test' })
}

export const addCategory = async (req, res) => {
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category created successfuly !!' })
    } catch (err) {
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const updateCategory = async (req, res) => {
    try {
        let {id} = req.params
        let data = req.body
        let updatedCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCategory) return res.status(404).send({message: 'Category not fount, not updated'})
        return res.send({message: 'Category was updated successfuly !!'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating category'})
    }
}
