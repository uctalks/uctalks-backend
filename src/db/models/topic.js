import mongoose from 'mongoose'

const TopicSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		likes: {
			type: Number,
			default: 0
		}
	},
	{
		strict: 'throw' // throw error, if field is not specified in the schema
	}
)

export default mongoose.model('Topic', TopicSchema)
