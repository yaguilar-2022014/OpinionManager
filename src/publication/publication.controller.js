'use strict'

import Publication from './publication.model.js'
import Category from '../category/category.model.js'

export const test = async (req, res) => {
    return res.send({ message: 'PUBLICATION | Function test' })
}

export const publicate = async (req, res) => {
    try {
        let data = req.body
        let category = await Category.findOne({ _id: data.category })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        let publication = new Publication(data)
        await publication.save()
        return res.send({ message: 'Publicated successfuly !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error at publicate' })
    }
}

export const updatePublication = async (req, res) => {
    try {
        let {id} = req.params
        let data = req.body
        let updatedPublication = await Publication.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('category', ['tittle'])
        if(!updatedPublication)return res.status(404).send({message: 'Publication not found, not updated'})
        return res.send({message: 'Publication updated successfuly !!', updatedPublication})
    } catch (err) {
        console.error(err)
    }
}
