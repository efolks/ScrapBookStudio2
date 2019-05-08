const router = require('express').Router()
const {CanvasText} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const text = await CanvasText.findByPk(id);
    res.status(200).json(text)
  } catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
    try {
        const newCanvasText = await CanvasText.create({
            content: req.params.content,
            x_corrd: 200,
            y_corrd: 200
        })
        res.send(newCanvasText)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const canvasText = await CanvasText.findByPk(req.params.id)
        const updatedCanvasText = await canvasText.update(req.body)
        res.status(200).json(updatedCanvasText)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const canvasText = await CanvasText.findByPk(id)
        await canvasText.destroy()
        res.status(200)
    } catch (error) {
        next(error)
    }
})