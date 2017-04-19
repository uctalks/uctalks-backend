import mongoose from 'mongoose'

const TopicSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
})

export default mongoose.model('Topic', TopicSchema)
